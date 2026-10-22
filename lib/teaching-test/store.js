// Server-side in-memory cache for development/offline fallback
const globalMemoryStore = globalThis.__teachingTestStore || {
  readiness: new Map(), // key: `${userId}_${language}`
  assessments: new Map(), // key: assessmentId
  verified: new Map(), // key: `${userId}_${language}_${level}`
};
globalThis.__teachingTestStore = globalMemoryStore;

async function getSupabaseServerClient() {
  try {
    const { createClient } = await import('../supabase/server.js');
    return await createClient();
  } catch (e) {
    return null;
  }
}

/**
 * Save user readiness
 */
export async function saveUserReadiness(userId, language, willingToTeach, readyForTest) {
  const normLang = language.toLowerCase().trim();
  const key = `${userId}_${normLang}`;
  
  const record = {
    userId,
    language: normLang,
    willingToTeach: !!willingToTeach,
    readyForTest: !!readyForTest,
    updatedAt: new Date().toISOString()
  };

  globalMemoryStore.readiness.set(key, record);

  // Attempt saving to Supabase if configured
  try {
    const supabase = await getSupabaseServerClient();
    await supabase.from('teaching_readiness').upsert({
      user_id: userId,
      language: normLang,
      willing_to_teach: !!willingToTeach,
      ready_for_test: !!readyForTest,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,language' });
  } catch (err) {
    // Fallback in memory
  }

  return record;
}

/**
 * Save newly started assessment attempt
 */
export async function saveStartedAssessment(assessmentId, userId, language, level, serverQuestions, clientQuestions) {
  const record = {
    id: assessmentId,
    userId,
    language,
    level,
    status: 'in-progress',
    serverQuestions,
    clientQuestions,
    answers: {},
    startedAt: new Date().toISOString(),
    submittedAt: null
  };

  globalMemoryStore.assessments.set(assessmentId, record);

  try {
    const supabase = await getSupabaseServerClient();
    await supabase.from('teaching_assessments').insert({
      id: assessmentId,
      user_id: userId,
      language,
      level,
      status: 'in-progress',
      questions_data: serverQuestions,
      started_at: new Date().toISOString()
    });
  } catch (err) {
    // Fallback in memory
  }

  return record;
}

/**
 * Get assessment by ID
 */
export async function getAssessmentById(assessmentId) {
  const mem = globalMemoryStore.assessments.get(assessmentId);
  if (mem) return mem;

  try {
    const supabase = await getSupabaseServerClient();
    const { data } = await supabase.from('teaching_assessments').select('*').eq('id', assessmentId).single();
    if (data) {
      return {
        id: data.id,
        userId: data.user_id,
        language: data.language,
        level: data.level,
        status: data.status,
        serverQuestions: data.questions_data,
        answers: data.answers_data,
        mcqScore: data.mcq_score,
        codingScore: data.coding_score,
        teachingScore: data.teaching_score,
        totalScore: data.total_score,
        passed: data.passed,
        aiFeedback: data.ai_feedback,
        startedAt: data.started_at,
        submittedAt: data.submitted_at
      };
    }
  } catch (err) {
    // Not found
  }

  return null;
}

/**
 * Update completed assessment and award verified eligibility if passed
 */
export async function saveCompletedAssessment(assessmentId, gradeData) {
  const existing = await getAssessmentById(assessmentId);
  if (!existing) {
    throw new Error('Assessment session not found.');
  }

  const updatedRecord = {
    ...existing,
    status: 'completed',
    answers: gradeData.answers,
    mcqScore: gradeData.mcqScore,
    codingScore: gradeData.codingScore,
    teachingScore: gradeData.teachingScore,
    totalScore: gradeData.totalScore,
    percentage: gradeData.percentage,
    passed: gradeData.passed,
    passEvaluation: gradeData.passEvaluation,
    aiFeedback: gradeData.aiFeedback,
    codingResults: gradeData.codingResults,
    teachingResults: gradeData.teachingResults,
    submittedAt: new Date().toISOString(),
    timeTakenSeconds: gradeData.timeTakenSeconds
  };

  globalMemoryStore.assessments.set(assessmentId, updatedRecord);

  // If passed, award verified eligibility (preserving existing, independent per language & level)
  if (gradeData.passed) {
    const verifiedKey = `${existing.userId}_${existing.language}_${existing.level}`;
    const verifiedRecord = {
      id: crypto.randomUUID(),
      userId: existing.userId,
      language: existing.language,
      level: existing.level,
      assessmentId,
      score: gradeData.totalScore,
      verifiedAt: new Date().toISOString()
    };
    globalMemoryStore.verified.set(verifiedKey, verifiedRecord);

    try {
      const supabase = await getSupabaseServerClient();
      await supabase.from('verified_teaching_eligibility').upsert({
        user_id: existing.userId,
        language: existing.language,
        level: existing.level,
        assessment_id: assessmentId,
        score: gradeData.totalScore,
        verified_at: new Date().toISOString()
      }, { onConflict: 'user_id,language,level' });
    } catch (err) {
      // Memory store already preserved
    }
  }

  try {
    const supabase = await getSupabaseServerClient();
    await supabase.from('teaching_assessments').update({
      status: 'completed',
      answers_data: gradeData.answers,
      mcq_score: gradeData.mcqScore,
      coding_score: gradeData.codingScore,
      teaching_score: gradeData.teachingScore,
      total_score: gradeData.totalScore,
      percentage: gradeData.percentage,
      passed: gradeData.passed,
      ai_feedback: gradeData.aiFeedback,
      submitted_at: new Date().toISOString(),
      time_taken_seconds: gradeData.timeTakenSeconds
    }).eq('id', assessmentId);
  } catch (err) {
    // Ignore
  }

  return updatedRecord;
}

/**
 * Get verified teaching eligibilities for a user
 */
export async function getVerifiedEligibilities(userId) {
  const verifiedList = [];

  // 1. From memory store
  for (const [key, val] of globalMemoryStore.verified.entries()) {
    if (val.userId === userId) {
      verifiedList.push(val);
    }
  }

  // 2. From Supabase if available
  try {
    const supabase = await getSupabaseServerClient();
    const { data, error } = await supabase
      .from('verified_teaching_eligibility')
      .select('*')
      .eq('user_id', userId);

    if (!error && Array.isArray(data)) {
      data.forEach(d => {
        if (!verifiedList.some(v => v.language === d.language && v.level === d.level)) {
          verifiedList.push({
            id: d.id,
            userId: d.user_id,
            language: d.language,
            level: d.level,
            assessmentId: d.assessment_id,
            score: d.score,
            verifiedAt: d.verified_at
          });
        }
      });
    }
  } catch (err) {
    // Fallback to memory
  }

  return verifiedList;
}
