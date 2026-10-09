import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getLocalActivityLogs } from '@/lib/dataStore';

export async function GET() {
  try {
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data: logs, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (!error && logs) {
          return NextResponse.json(logs, { status: 200 });
        }
      } catch (err) {
        console.warn('Supabase activity log fetch failed, using local store:', err);
      }
    }

    const localLogs = getLocalActivityLogs(50);
    return NextResponse.json(localLogs, { status: 200 });
  } catch (error) {
    console.error('Activity GET error:', error);
    return NextResponse.json(getLocalActivityLogs(50), { status: 200 });
  }
}
