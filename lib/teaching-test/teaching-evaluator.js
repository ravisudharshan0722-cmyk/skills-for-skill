/**
 * AI-Assisted Teaching & Pedagogical Evaluator
 * Evaluates candidate explanations against a structured 5-point rubric:
 * 1. Technical Correctness (1.5 marks)
 * 2. Clarity of Explanation (1.0 mark)
 * 3. Logical Reasoning (1.0 mark)
 * 4. Teaching Suitability / Empathy (0.75 marks)
 * 5. Practical Examples / Analogies (0.75 marks)
 * Total: 5.0 marks per question
 */

export async function evaluateTeachingResponse(prompt, answer, language = 'python', level = 'basics') {
  if (!answer || answer.trim().length < 15) {
    return {
      score: 0,
      maxMarks: 5,
      feedback: 'Answer is too brief or empty. A comprehensive explanation with examples is expected for teaching qualification.',
      rubricBreakdown: {
        technicalCorrectness: 0,
        clarity: 0,
        logicalReasoning: 0,
        teachingSuitability: 0,
        examples: 0
      }
    };
  }

  const cleanAnswer = answer.trim();
  const wordCount = cleanAnswer.split(/\s+/).length;

  // Multi-criteria scoring
  let technicalCorrectness = 0;
  let clarity = 0;
  let logicalReasoning = 0;
  let teachingSuitability = 0;
  let examples = 0;

  // 1. Length & depth analysis
  if (wordCount >= 40) clarity += 0.5;
  if (wordCount >= 80) clarity += 0.5;

  // 2. Technical terminology & correctness
  const technicalKeywords = [
    'memory', 'reference', 'pointer', 'stack', 'heap', 'immutable', 'mutable',
    'function', 'object', 'class', 'scope', 'variable', 'loop', 'condition',
    'algorithm', 'complexity', 'time', 'space', 'recursion', 'base case',
    'array', 'list', 'map', 'hash', 'type', 'parameter', 'return'
  ];
  const matchedKeywords = technicalKeywords.filter(kw => cleanAnswer.toLowerCase().includes(kw));
  if (matchedKeywords.length >= 2) technicalCorrectness += 0.75;
  if (matchedKeywords.length >= 4) technicalCorrectness += 0.75;

  // 3. Examples & code presence
  const hasCodeOrAnalogy = /```|code|example|analog|like a|imagine|for instance|e\.g\.|suppose/i.test(cleanAnswer);
  if (hasCodeOrAnalogy) {
    examples += 0.5;
    if (cleanAnswer.includes('(') || cleanAnswer.includes('{') || cleanAnswer.includes('=')) {
      examples += 0.25;
    }
  }

  // 4. Teaching empathy & pedagogy
  const pedagogicalTone = /beginner|student|learn|understand|step|first|next|remember|simple|note|tip/i.test(cleanAnswer);
  if (pedagogicalTone) {
    teachingSuitability += 0.5;
  }
  if (cleanAnswer.length > 200) {
    teachingSuitability += 0.25;
  }

  // 5. Logical structure
  const hasParagraphsOrBullet = cleanAnswer.includes('\n') || cleanAnswer.includes('1.') || cleanAnswer.includes('-');
  if (hasParagraphsOrBullet) {
    logicalReasoning += 0.5;
  }
  if (wordCount >= 60) {
    logicalReasoning += 0.5;
  }

  // Clamp individual criteria
  technicalCorrectness = Math.min(1.5, Number(technicalCorrectness.toFixed(2)));
  clarity = Math.min(1.0, Number(clarity.toFixed(2)));
  logicalReasoning = Math.min(1.0, Number(logicalReasoning.toFixed(2)));
  teachingSuitability = Math.min(0.75, Number(teachingSuitability.toFixed(2)));
  examples = Math.min(0.75, Number(examples.toFixed(2)));

  const totalScore = Number((technicalCorrectness + clarity + logicalReasoning + teachingSuitability + examples).toFixed(2));

  let feedback = 'Good conceptual demonstration.';
  if (totalScore >= 4.0) {
    feedback = 'Excellent pedagogical delivery with clear conceptual clarity, logical breakdown, and relevant analogies.';
  } else if (totalScore >= 2.5) {
    feedback = 'Solid explanation. Could be improved by adding more concrete code examples and highlighting common beginner pitfalls.';
  } else {
    feedback = 'Fair attempt, but requires deeper technical explanation, structured analogies, and clearer step-by-step guidance.';
  }

  return {
    score: totalScore,
    maxMarks: 5,
    feedback,
    rubricBreakdown: {
      technicalCorrectness,
      clarity,
      logicalReasoning,
      teachingSuitability,
      examples
    }
  };
}

/**
 * Generates overall AI constructive assessment feedback
 */
export function generateOverallAssessmentFeedback(mcqScore, codingScore, teachingScore, language, level, isPassed) {
  const strengths = [];
  const improvements = [];

  // MCQs
  if (mcqScore >= 16) {
    strengths.push(`Exceptional command over ${language} core syntax and language primitives (${mcqScore}/20).`);
  } else if (mcqScore >= 10) {
    strengths.push(`Competent understanding of ${language} multiple-choice concepts (${mcqScore}/20).`);
  } else {
    improvements.push(`Review fundamental syntax, operators, and output predictions in ${language} (scored ${mcqScore}/20, required min 10).`);
  }

  // Coding
  if (codingScore >= 16) {
    strengths.push(`Strong algorithmic problem solving and clean test-case execution (${codingScore}/20).`);
  } else if (codingScore >= 10) {
    strengths.push(`Good implementation of algorithmic logic meeting the minimum requirement (${codingScore}/20).`);
  } else {
    improvements.push(`Strengthen hands-on implementation and edge-case handling for algorithmic challenges (scored ${codingScore}/20, required min 10).`);
  }

  // Teaching
  if (teachingScore >= 8) {
    strengths.push(`Outstanding pedagogical skills: explanations are empathetic, structured, and beginner-accessible (${teachingScore}/10).`);
  } else if (teachingScore >= 5) {
    strengths.push(`Satisfactory teaching ability with adequate explanations (${teachingScore}/10).`);
  } else {
    improvements.push(`Improve pedagogical clarity: incorporate real-world analogies, step-by-step breakdowns, and practical code snippets when answering learner questions (scored ${teachingScore}/10, required min 5).`);
  }

  const constructiveFeedback = isPassed
    ? `Congratulations! You have demonstrated verified technical proficiency and effective teaching aptitude in ${language} (${level.toUpperCase()}). You satisfy all section criteria and the 70% threshold. You are verified and qualified to teach this subject on the Skill Exchange platform.`
    : `You did not meet the qualification threshold for ${language} (${level.toUpperCase()}). To earn verified teaching eligibility, you must score at least 35/50 overall and meet all individual section minimums. Review the areas for improvement above and feel free to retake the assessment when ready.`;

  return {
    strengths,
    improvements,
    constructiveFeedback
  };
}
