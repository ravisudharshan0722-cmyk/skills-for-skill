import vm from 'node:vm';

/**
 * Code Execution Service for Teaching Eligibility Test.
 * Supports secure sandboxed JavaScript execution locally via node:vm,
 * and remote sandboxed execution via Piston API or custom container runner.
 * Transparently reports execution status and limitations.
 */

const PISTON_URL = process.env.PISTON_API_URL || process.env.CODE_EXECUTION_SERVICE_URL || 'https://emkc.org/api/v2/piston/execute';

export async function executeCodeOnSandbox(language, code, input = '', expectedOutput = '') {
  const normLang = language.toLowerCase().trim();

  // 1. In-process isolated VM for JavaScript / TypeScript
  if (normLang === 'javascript' || normLang === 'js' || normLang === 'typescript' || normLang === 'ts') {
    return executeJavaScriptInVM(code, input, expectedOutput);
  }

  // 2. Remote sandbox for other compiled/interpreted languages (Python, Java, C++, C, Go, etc.)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const pistonLangMap = {
      python: { language: 'python', version: '3.10.0' },
      java: { language: 'java', version: '15.0.2' },
      cpp: { language: 'c++', version: '10.2.0' },
      c: { language: 'c', version: '10.2.0' },
      csharp: { language: 'csharp', version: '6.12.0' },
      php: { language: 'php', version: '8.2.3' },
      go: { language: 'go', version: '1.16.2' },
      kotlin: { language: 'kotlin', version: '1.8.20' }
    };

    const config = pistonLangMap[normLang] || { language: normLang, version: '*' };

    const res = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [{ content: code }],
        stdin: input
      })
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      return {
        passed: false,
        actual: '',
        expected: expectedOutput,
        error: `Sandbox execution service returned HTTP ${res.status}. Check service availability.`,
        serviceStatus: 'unavailable'
      };
    }

    const data = await res.json();
    const stdout = (data.run?.stdout || '').trim();
    const stderr = (data.run?.stderr || '').trim();
    const cleanExpected = String(expectedOutput).trim();

    const passed = stdout === cleanExpected && !stderr;

    return {
      passed,
      actual: stdout || stderr,
      expected: cleanExpected,
      error: stderr || null,
      serviceStatus: 'online'
    };
  } catch (err) {
    // Transparently report that external execution service is currently unreachable/unconfigured
    return {
      passed: false,
      actual: '',
      expected: expectedOutput,
      error: `Secure execution service offline for ${language} (${err.message}). Local VM is only available for JavaScript/TypeScript. Configure CODE_EXECUTION_SERVICE_URL or ensure internet connectivity for external sandboxes.`,
      serviceStatus: 'unconfigured_or_offline'
    };
  }
}

/**
 * Isolated VM sandbox for JavaScript
 */
function executeJavaScriptInVM(code, input, expectedOutput) {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))
    },
    input: input,
    JSON: JSON,
    Math: Math,
    parseInt: parseInt,
    parseFloat: parseFloat,
    Array: Array,
    String: String,
    Object: Object,
    Set: Set,
    Map: Map,
    Date: Date
  };

  const context = vm.createContext(sandbox);

  try {
    const wrappedCode = `
      ${code}
      // If code defines helper functions or expression, capture result if needed
    `;
    const script = new vm.Script(wrappedCode);
    const start = Date.now();
    script.runInContext(context, { timeout: 2500 });
    const duration = Date.now() - start;

    const actual = logs.join('\n').trim();
    const cleanExpected = String(expectedOutput).trim();
    const passed = actual === cleanExpected;

    return {
      passed,
      actual,
      expected: cleanExpected,
      duration,
      error: null,
      serviceStatus: 'local_vm_sandbox'
    };
  } catch (err) {
    return {
      passed: false,
      actual: logs.join('\n').trim(),
      expected: expectedOutput,
      error: err.message,
      serviceStatus: 'local_vm_sandbox'
    };
  }
}

/**
 * Batch evaluates candidate code against a list of test cases
 */
export async function evaluateCodeSubmission(language, code, testCases = []) {
  if (!code || !code.trim()) {
    return {
      totalTestCases: testCases.length,
      passedCount: 0,
      scoreRatio: 0,
      results: testCases.map((tc, idx) => ({
        id: tc.id || idx + 1,
        passed: false,
        error: 'No code submitted.'
      }))
    };
  }

  const results = [];
  let passedCount = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const execResult = await executeCodeOnSandbox(language, code, tc.input, tc.expected);
    if (execResult.passed) {
      passedCount++;
    }
    results.push({
      id: tc.id || i + 1,
      input: tc.input,
      expected: tc.expected,
      actual: execResult.actual,
      passed: execResult.passed,
      error: execResult.error,
      serviceStatus: execResult.serviceStatus
    });
  }

  const scoreRatio = testCases.length > 0 ? passedCount / testCases.length : 0;

  return {
    totalTestCases: testCases.length,
    passedCount,
    scoreRatio,
    results
  };
}
