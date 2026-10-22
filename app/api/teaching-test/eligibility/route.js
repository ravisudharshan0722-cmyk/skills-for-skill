import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';
import { getVerifiedEligibilities } from '../../../../lib/teaching-test/store';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get('userId');

    if (!userId) {
      try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          userId = user.id;
        }
      } catch (e) {
        // Fallback
      }
    }

    if (!userId) {
      userId = 'user_guest';
    }

    const eligibilities = await getVerifiedEligibilities(userId);

    return NextResponse.json({
      success: true,
      userId,
      eligibilities
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
