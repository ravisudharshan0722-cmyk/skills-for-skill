import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import { saveUserReadiness } from '../../../../lib/teaching-test/store';

export async function POST(request) {
  try {
    const body = await request.json();
    const { language, willingToTeach, readyForTest } = body;

    if (!language) {
      return NextResponse.json({ error: 'Language is required' }, { status: 400 });
    }

    // Determine current user
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

    const saved = await saveUserReadiness(userId, language, willingToTeach, readyForTest);

    return NextResponse.json({
      success: true,
      data: saved
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
