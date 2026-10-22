/**
 * Teaching Eligibility Test Configuration
 * Defines supported languages, assessment levels, syllabi, and scoring rules.
 */

export const SUPPORTED_LANGUAGES = [
  { id: 'java', name: 'Java', extension: 'java', icon: '☕' },
  { id: 'python', name: 'Python', extension: 'py', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', extension: 'js', icon: '⚡' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts', icon: '🔷' },
  { id: 'cpp', name: 'C++', extension: 'cpp', icon: '⚙️' },
  { id: 'c', name: 'C', extension: 'c', icon: '🔧' },
  { id: 'csharp', name: 'C#', extension: 'cs', icon: '🎯' },
  { id: 'php', name: 'PHP', extension: 'php', icon: '🐘' },
  { id: 'go', name: 'Go', extension: 'go', icon: '🐹' },
  { id: 'kotlin', name: 'Kotlin', extension: 'kt', icon: '📱' },
];

export const ASSESSMENT_LEVELS = {
  basics: {
    id: 'basics',
    title: 'Basics — Beginner',
    durationMinutes: 30,
    durationSeconds: 1800,
    targetAudience: 'Novice learners & absolute beginners',
    description: 'Fundamental syntax, primitive types, control flow, functions, and core concepts.',
    syllabus: [
      'Variables, primitive data types, and scope',
      'Conditional statements (if/else, switch)',
      'Loops and iterations (for, while, loop controls)',
      'Function declarations, parameters, and return values',
      'Basic data structures: arrays / lists and basic string manipulation',
      'Simple error handling and clean coding habits'
    ],
    sectionsSummary: '10 MCQs (20 marks) + 2 Coding Challenges (20 marks) + 2 Teaching Scenarios (10 marks)'
  },
  medium: {
    id: 'medium',
    title: 'Medium — Intermediate',
    durationMinutes: 45,
    durationSeconds: 2700,
    targetAudience: 'Intermediate developers and working programmers',
    description: 'OOP, data structures, recursion, memory concepts, exceptions, and practical algorithmic patterns.',
    syllabus: [
      'Object-Oriented Programming (Classes, Inheritance, Polymorphism, Encapsulation)',
      'Data structures (HashMaps/Dictionaries, Sets, Stacks, Queues, Linked Lists)',
      'Recursion, divide-and-conquer, and algorithmic complexity (Big-O)',
      'Exception handling, resource cleanup, and defensive programming',
      'Standard library APIs, collections, and higher-order functions (map/filter/reduce)',
      'Debugging subtle edge cases and modular architecture'
    ],
    sectionsSummary: '10 MCQs (20 marks) + 2 Coding Challenges (20 marks) + 2 Teaching Scenarios (10 marks)'
  },
  advanced: {
    id: 'advanced',
    title: 'Advanced — Programmer Level',
    durationMinutes: 60,
    durationSeconds: 3600,
    targetAudience: 'Advanced programmers, architects, and senior developers',
    description: 'Concurrency, memory management, design patterns, complex algorithms, and performance optimization.',
    syllabus: [
      'Concurrency, multithreading, async/await, and thread safety',
      'Memory model, garbage collection internals, and pointer/reference management',
      'Advanced data structures & algorithms (Trees, Graphs, Dynamic Programming)',
      'Design patterns (Factory, Singleton, Observer, Strategy) and clean architecture',
      'Performance profiling, memory leaks, and optimization techniques',
      'Enterprise-grade code review, pedagogy, and architectural guidance'
    ],
    sectionsSummary: '10 MCQs (20 marks) + 2 Coding Challenges (20 marks) + 2 Teaching Scenarios (10 marks)'
  }
};

export const SCORING_RULES = {
  totalQuestions: 14,
  totalMarks: 50,
  passingTotalMarks: 35, // 70%
  passingPercentage: 70,
  
  sections: {
    mcq: {
      title: 'Section A: Multiple-Choice Questions',
      count: 10,
      marksPerQuestion: 2,
      totalMarks: 20,
      minimumPassingMarks: 10, // 50%
    },
    coding: {
      title: 'Section B: Coding Challenges',
      count: 2,
      marksPerQuestion: 10,
      totalMarks: 20,
      minimumPassingMarks: 10, // 50%
    },
    teaching: {
      title: 'Section C: Teaching & Explanation',
      count: 2,
      marksPerQuestion: 5,
      totalMarks: 10,
      minimumPassingMarks: 5, // 50%
    }
  },

  /**
   * Determine whether a candidate passes the assessment.
   * All section minimums AND the total threshold must be met.
   */
  evaluatePassStatus: (mcqScore, codingScore, teachingScore) => {
    const totalScore = Number((mcqScore + codingScore + teachingScore).toFixed(2));
    const percentage = Number(((totalScore / 50) * 100).toFixed(1));
    
    const mcqPassed = mcqScore >= SCORING_RULES.sections.mcq.minimumPassingMarks;
    const codingPassed = codingScore >= SCORING_RULES.sections.coding.minimumPassingMarks;
    const teachingPassed = teachingScore >= SCORING_RULES.sections.teaching.minimumPassingMarks;
    const totalPassed = totalScore >= SCORING_RULES.passingTotalMarks;

    const isPassed = totalPassed && mcqPassed && codingPassed && teachingPassed;

    return {
      isPassed,
      totalScore,
      percentage,
      mcqPassed,
      codingPassed,
      teachingPassed,
      totalPassed,
      requirements: {
        mcq: { score: mcqScore, required: SCORING_RULES.sections.mcq.minimumPassingMarks, passed: mcqPassed },
        coding: { score: codingScore, required: SCORING_RULES.sections.coding.minimumPassingMarks, passed: codingPassed },
        teaching: { score: teachingScore, required: SCORING_RULES.sections.teaching.minimumPassingMarks, passed: teachingPassed },
        total: { score: totalScore, required: SCORING_RULES.passingTotalMarks, passed: totalPassed }
      }
    };
  }
};
