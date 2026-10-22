import { QUESTION_BANK } from './question-bank.js';
import { SUPPORTED_LANGUAGES, ASSESSMENT_LEVELS } from './config.js';

/**
 * Utility to shuffle an array immutably
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generate synthetic curated questions for languages not yet explicitly listed in bank
 */
function generateFallbackQuestionSet(languageId, level) {
  const langObj = SUPPORTED_LANGUAGES.find(l => l.id === languageId) || { name: languageId, extension: 'txt' };
  const langName = langObj.name;

  const mcqs = [
    {
      id: `${languageId}_${level}_1`,
      question: `What is the primary compilation/execution model used by ${langName}?`,
      options: [
        `Direct machine-code compilation or optimized runtime engine`,
        `Pure line-by-line interpretation without bytecode`,
        `Direct execution directly on the CPU hardware without an OS`,
        `Assembly language simulation only`
      ],
      correctIndex: 0,
      explanation: `${langName} uses modern toolchains that compile to native machine code, intermediate bytecode, or optimized execution engines.`
    },
    {
      id: `${languageId}_${level}_2`,
      question: `How are variables scoped in standard block structures in ${langName}?`,
      options: [
        `Globally across the entire file only`,
        `Lexically to the enclosing block, function, or file scope`,
        `Variables cannot be scoped in ${langName}`,
        `Dynamically scoped at runtime based on caller`
      ],
      correctIndex: 1,
      explanation: `Modern ${langName} enforces lexical block scoping, meaning identifiers are accessible within their enclosing code block.`
    },
    {
      id: `${languageId}_${level}_3`,
      question: `Which data structure in ${langName} provides O(1) average-time key-value lookups?`,
      options: ['Linked List', 'Hash Map / Dictionary', 'Binary Search Tree', 'Sorted Array'],
      correctIndex: 1,
      explanation: `Hash maps/dictionaries use hash tables to provide amortized constant O(1) key lookups.`
    },
    {
      id: `${languageId}_${level}_4`,
      question: `What is the recommended best practice for error and exception handling in ${langName}?`,
      options: [
        `Catching all errors and ignoring them silently`,
        `Handling specific exceptions gracefully and releasing resources`,
        `Terminating the program immediately with exit(0)`,
        `Disabling compiler warnings`
      ],
      correctIndex: 1,
      explanation: `Specific exception handling with clean resource teardown prevents silent failures and resource leaks.`
    },
    {
      id: `${languageId}_${level}_5`,
      question: `In ${langName}, what happens when an array index is accessed out of bounds?`,
      options: [
        `An error/panic/exception is raised or undefined behavior occurs depending on language safety guarantees`,
        `The array automatically doubles in size`,
        `It returns null without any error`,
        `It restarts the program`
      ],
      correctIndex: 0,
      explanation: `Accessing out-of-bounds indices violates memory bounds, triggering a runtime exception/panic in safe environments or undefined behavior in raw memory languages.`
    },
    {
      id: `${languageId}_${level}_6`,
      question: `What is the fundamental difference between pass-by-value and pass-by-reference in ${langName}?`,
      options: [
        `Pass-by-value copies the value/reference address; pass-by-reference aliases the original caller variable directly`,
        `Pass-by-value works only for strings`,
        `Pass-by-reference is strictly forbidden in all languages`,
        `There is no difference in memory representation`
      ],
      correctIndex: 0,
      explanation: `Pass-by-value creates a copy of the argument value (or pointer value), whereas true pass-by-reference creates an alias pointing directly to the caller variable.`
    },
    {
      id: `${languageId}_${level}_7`,
      question: `Which memory region stores local function variables and call frames in ${langName}?`,
      options: ['Heap memory', 'Call Stack memory', 'Permanent Generation', 'Disk Cache'],
      correctIndex: 1,
      explanation: `Local primitive variables and function activation records are allocated on the Call Stack in LIFO order.`
    },
    {
      id: `${languageId}_${level}_8`,
      question: `What is the purpose of pure functions and immutability in ${langName}?`,
      options: [
        `They make code predictable, thread-safe, and free from unexpected side effects`,
        `They reduce executable file size by 50%`,
        `They make variables accessible across different computers`,
        `They disable garbage collection`
      ],
      correctIndex: 0,
      explanation: `Pure functions return identical results for identical inputs with zero observable side effects, enabling safe concurrency and easier unit testing.`
    },
    {
      id: `${languageId}_${level}_9`,
      question: `What is the time complexity of searching an element in a balanced binary search tree in ${langName}?`,
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      correctIndex: 1,
      explanation: `Balanced binary search trees halve the search space at each level, guaranteeing O(log n) time complexity.`
    },
    {
      id: `${languageId}_${level}_10`,
      question: `What is the primary role of a code linter and static analyzer in ${langName}?`,
      options: [
        `To inspect source code for bugs, stylistic violations, and security vulnerabilities without running the program`,
        `To convert source code into an image`,
        `To run the application in production`,
        `To encrypt the source files`
      ],
      correctIndex: 0,
      explanation: `Static analysis tools analyze ASTs (Abstract Syntax Trees) to catch code smells, unsafe patterns, and typing mismatches prior to compilation or runtime.`
    }
  ];

  const coding = [
    {
      id: `${languageId}_${level}_code_1`,
      title: `Two Sum - ${langName}`,
      description: `Given an array of integers and an integer target, write a solution in ${langName} that finds the two numbers that add up to target and returns their indices.`,
      constraints: `2 <= length <= 10^4, exactly one valid solution exists`,
      starterCode: `// Write your ${langName} solution here\n`,
      sampleTestCases: [
        { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]', explanation: '2 + 7 = 9' }
      ],
      hiddenTestCases: [
        { input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
        { input: 'nums = [3, 3], target = 6', expected: '[0, 1]' }
      ]
    },
    {
      id: `${languageId}_${level}_code_2`,
      title: `String Reversal & Clean Up - ${langName}`,
      description: `Write a function in ${langName} that takes an alphanumeric string and reverses all words while preserving single spacing.`,
      constraints: `1 <= length <= 10^4`,
      starterCode: `// Write your ${langName} solution here\n`,
      sampleTestCases: [
        { input: '"hello world"', expected: '"olleh dlrow"', explanation: 'Reversed individual words' }
      ],
      hiddenTestCases: [
        { input: '"abc"', expected: '"cba"' },
        { input: '"code"', expected: '"edoc"' }
      ]
    }
  ];

  const teaching = [
    {
      id: `${languageId}_${level}_teach_1`,
      prompt: `How would you explain the fundamental concept of pointers, memory references, and object allocation in ${langName} to a student coming from a non-technical background? Use a concrete everyday analogy.`,
      guidance: `Check for clear real-world metaphor (e.g. house addresses vs actual house contents), explaining reference copying vs deep value copying, and respectful teaching style.`
    },
    {
      id: `${languageId}_${level}_teach_2`,
      prompt: `A student asks: "How do I decide between an Array and a Hash Map when solving a coding problem in ${langName}?" How would you teach them to evaluate time vs space complexity trade-offs?`,
      guidance: `Look for explanation of indexing by integer vs key hashing, O(1) random access vs O(1) key lookup, memory overhead of hash tables, and practical decision framework.`
    }
  ];

  return { mcqs, coding, teaching };
}

/**
 * Generate full question set for an assessment
 * Returns { serverData, clientData }
 * serverData: contains full answer keys, correctIndex, hidden test cases
 * clientData: sanitized for the candidate test UI (no correctIndex, no hidden test cases)
 */
export function generateAssessmentQuestions(languageId, level = 'basics') {
  const normLang = languageId.toLowerCase().trim();
  const normLevel = level.toLowerCase().trim();

  // 1. Pick from curated bank if exists, or generate fallback
  let rawSet = QUESTION_BANK[normLang]?.[normLevel];
  if (!rawSet) {
    // If exact level doesn't exist, check python or javascript equivalent or fallback
    rawSet = QUESTION_BANK[normLang]?.basics || generateFallbackQuestionSet(normLang, normLevel);
  }

  // 2. Shuffle MCQ choices and calculate new correctIndex to ensure non-deterministic order
  const shuffledMcqs = rawSet.mcqs.map((mcq, idx) => {
    const originalOptions = [...mcq.options];
    const correctOptionText = originalOptions[mcq.correctIndex];
    const shuffledOptions = shuffleArray(originalOptions);
    const newCorrectIndex = shuffledOptions.indexOf(correctOptionText);

    return {
      id: mcq.id || `mcq_${idx + 1}`,
      questionNumber: idx + 1,
      section: 'mcq',
      question: mcq.question,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
      explanation: mcq.explanation,
      marks: 2
    };
  });

  // 3. Prepare Coding Challenges
  const codingChallenges = rawSet.coding.map((code, idx) => ({
    id: code.id || `code_${idx + 1}`,
    questionNumber: 10 + idx + 1,
    section: 'coding',
    title: code.title,
    description: code.description,
    constraints: code.constraints,
    starterCode: code.starterCode,
    sampleTestCases: code.sampleTestCases,
    hiddenTestCases: code.hiddenTestCases,
    marks: 10
  }));

  // 4. Prepare Teaching Scenarios
  const teachingScenarios = rawSet.teaching.map((teach, idx) => ({
    id: teach.id || `teach_${idx + 1}`,
    questionNumber: 12 + idx + 1,
    section: 'teaching',
    prompt: teach.prompt,
    guidance: teach.guidance,
    marks: 5
  }));

  // Full server data (includes secret keys, correct indices, hidden test cases)
  const serverData = {
    language: normLang,
    level: normLevel,
    mcqs: shuffledMcqs,
    coding: codingChallenges,
    teaching: teachingScenarios,
    totalQuestions: 14,
    totalMarks: 50
  };

  // Sanitized client data (safe to send to candidate frontend during test)
  const clientData = {
    language: normLang,
    level: normLevel,
    totalQuestions: 14,
    totalMarks: 50,
    mcqs: shuffledMcqs.map(m => ({
      id: m.id,
      questionNumber: m.questionNumber,
      section: 'mcq',
      question: m.question,
      options: m.options,
      marks: m.marks
      // NOTE: correctIndex and explanation are deliberately omitted during active test!
    })),
    coding: codingChallenges.map(c => ({
      id: c.id,
      questionNumber: c.questionNumber,
      section: 'coding',
      title: c.title,
      description: c.description,
      constraints: c.constraints,
      starterCode: c.starterCode,
      sampleTestCases: c.sampleTestCases,
      marks: c.marks
      // NOTE: hiddenTestCases are omitted until submission evaluation!
    })),
    teaching: teachingScenarios.map(t => ({
      id: t.id,
      questionNumber: t.questionNumber,
      section: 'teaching',
      prompt: t.prompt,
      marks: t.marks
    }))
  };

  return { serverData, clientData };
}
