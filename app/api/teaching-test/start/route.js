import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateAssessmentQuestions } from '@/lib/teaching-test/question-generator';
import { saveStartedAssessment } from '@/lib/teaching-test/store';
import { ASSESSMENT_LEVELS } from '@/lib/teaching-test/config';

export async function POST(request) {
  try {
    const body = await request.json();
    const { language, level, confirmedReady } = body;

    if (!language || !level) {
      return NextResponse.json({ error: 'Language and level are required.' }, { status: 400 });
    }

    if (!confirmedReady) {
      return NextResponse.json({ error: 'Confirmation of test instructions and readiness is required before starting.' }, { status: 400 });
    }

    const normLevel = level.toLowerCase();
    const levelConfig = ASSESSMENT_LEVELS[normLevel];
    if (!levelConfig) {
      return NextResponse.json({ error: 'Invalid assessment level.' }, { status: 400 });
    }

    let userId = 'user_guest';
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        userId = user.id;
      } else if (body.userId) {
        userId = body.userId;
      }
    } catch (e) {
      if (body.userId) userId = body.userId;
    }

    const assessmentId = crypto.randomUUID();
    const { serverData, clientData } = generateAssessmentQuestions(language, normLevel);

    await saveStartedAssessment(assessmentId, userId, language, normLevel, serverData, clientData);

    return NextResponse.json({
      success: true,
      assessmentId,
      language,
      level: normLevel,
      durationSeconds: levelConfig.durationSeconds,
      durationMinutes: levelConfig.durationMinutes,
      questions: clientData,
      startedAt: new Date().toISOString()
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
