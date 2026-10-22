import { NextResponse } from 'next/server';
import { executeCodeOnSandbox } from '../../../../lib/teaching-test/code-executor';

export async function POST(request) {
  try {
    const body = await request.json();
    const { language, code, testCases } = body;

    if (!code) {
      return NextResponse.json({ error: 'Code cannot be empty.' }, { status: 400 });
    }

    const casesToRun = Array.isArray(testCases) && testCases.length > 0
      ? testCases
      : [{ input: '', expected: '' }];

    const results = [];
    for (let i = 0; i < casesToRun.length; i++) {
      const tc = casesToRun[i];
      const exec = await executeCodeOnSandbox(language, code, tc.input, tc.expected);
      results.push({
        id: tc.id || i + 1,
        input: tc.input,
        expected: tc.expected,
        actual: exec.actual,
        passed: exec.passed,
        error: exec.error,
        serviceStatus: exec.serviceStatus
      });
    }

    return NextResponse.json({
      success: true,
      results
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
