import { NextResponse } from 'next/server';
import { getAssessmentById, saveCompletedAssessment } from '@/lib/teaching-test/store';
import { SCORING_RULES } from '@/lib/teaching-test/config';
import { evaluateCodeSubmission } from '@/lib/teaching-test/code-executor';
import { evaluateTeachingResponse, generateOverallAssessmentFeedback } from '@/lib/teaching-test/teaching-evaluator';

export async function POST(request) {
  try {
    const body = await request.json();
    const { assessmentId, answers = {}, timeTakenSeconds = 0 } = body;

    if (!assessmentId) {
      return NextResponse.json({ error: 'Assessment ID is required.' }, { status: 400 });
    }

    const assessment = await getAssessmentById(assessmentId);
    if (!assessment) {
      return NextResponse.json({ error: 'Assessment session not found.' }, { status: 404 });
    }

    const { serverQuestions, language, level } = assessment;
    const userMcqAnswers = answers.mcqs || {};
    const userCodingAnswers = answers.coding || {};
    const userTeachingAnswers = answers.teaching || {};

    // 1. Grade Section A: MCQs (10 questions, 2 marks each = 20 marks)
    let mcqScore = 0;
    const gradedMcqs = serverQuestions.mcqs.map(q => {
      const selectedIndex = userMcqAnswers[q.id];
      const isCorrect = selectedIndex !== undefined && Number(selectedIndex) === q.correctIndex;
      const marksAwarded = isCorrect ? q.marks : 0;
      mcqScore += marksAwarded;

      return {
        id: q.id,
        questionNumber: q.questionNumber,
        question: q.question,
        options: q.options,
        selectedIndex,
        correctIndex: q.correctIndex,
        isCorrect,
        marksAwarded,
        explanation: q.explanation
      };
    });

    // 2. Grade Section B: Coding Challenges (2 problems, 10 marks each = 20 marks)
    let codingScore = 0;
    const gradedCoding = [];

    for (let i = 0; i < serverQuestions.coding.length; i++) {
      const problem = serverQuestions.coding[i];
      const code = userCodingAnswers[problem.id] || '';
      const allTestCases = [
        ...(problem.sampleTestCases || []),
        ...(problem.hiddenTestCases || [])
      ];

      const evaluation = await evaluateCodeSubmission(language, code, allTestCases);
      const marksAwarded = Number((evaluation.scoreRatio * problem.marks).toFixed(2));
      codingScore += marksAwarded;

      gradedCoding.push({
        id: problem.id,
        title: problem.title,
        description: problem.description,
        submittedCode: code,
        marksAwarded,
        maxMarks: problem.marks,
        totalTestCases: evaluation.totalTestCases,
        passedCount: evaluation.passedCount,
        results: evaluation.results
      });
    }

    // 3. Grade Section C: Teaching & Pedagogical Scenarios (2 questions, 5 marks each = 10 marks)
    let teachingScore = 0;
    const gradedTeaching = [];

    for (let i = 0; i < serverQuestions.teaching.length; i++) {
      const scenario = serverQuestions.teaching[i];
      const answer = userTeachingAnswers[scenario.id] || '';
      const evaluation = await evaluateTeachingResponse(scenario.prompt, answer, language, level);
      const marksAwarded = evaluation.score;
      teachingScore += marksAwarded;

      gradedTeaching.push({
        id: scenario.id,
        prompt: scenario.prompt,
        submittedAnswer: answer,
        marksAwarded,
        maxMarks: scenario.marks,
        feedback: evaluation.feedback,
        rubricBreakdown: evaluation.rubricBreakdown
      });
    }

    mcqScore = Number(mcqScore.toFixed(2));
    codingScore = Number(codingScore.toFixed(2));
    teachingScore = Number(teachingScore.toFixed(2));

    // 4. Pass/Fail Decision via Central Scoring Rules
    const passEvaluation = SCORING_RULES.evaluatePassStatus(mcqScore, codingScore, teachingScore);
    const { isPassed, totalScore, percentage } = passEvaluation;

    // 5. Overall Constructive AI Feedback
    const aiFeedback = generateOverallAssessmentFeedback(mcqScore, codingScore, teachingScore, language, level, isPassed);

    // 6. Save Assessment Record and Award Verified Eligibility
    await saveCompletedAssessment(assessmentId, {
      answers,
      mcqScore,
      codingScore,
      teachingScore,
      totalScore,
      percentage,
      passed: isPassed,
      passEvaluation,
      aiFeedback,
      codingResults: gradedCoding,
      teachingResults: gradedTeaching,
      timeTakenSeconds
    });

    return NextResponse.json({
      success: true,
      assessmentId,
      language,
      level,
      totalScore,
      percentage,
      passed: isPassed,
      passEvaluation,
      scores: {
        mcq: { score: mcqScore, max: 20, passed: passEvaluation.mcqPassed },
        coding: { score: codingScore, max: 20, passed: passEvaluation.codingPassed },
        teaching: { score: teachingScore, max: 10, passed: passEvaluation.teachingPassed }
      },
      timeTakenSeconds,
      aiFeedback,
      review: {
        mcqs: gradedMcqs,
        coding: gradedCoding,
        teaching: gradedTeaching
      }
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
