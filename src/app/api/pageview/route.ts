import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

function isPlaceholderSupabase() {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
  );
}

// POST /api/pageview — record a page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const page: string = (body.page || '/').slice(0, 200);
    const visitor_id: string = (body.visitor_id || 'anonymous').slice(0, 64);

    if (isPlaceholderSupabase()) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const supabase = createAdminClient();
    await supabase.from('page_views').insert([{ page, visitor_id }]);

    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error('pageview POST error:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// GET /api/pageview — return aggregated visitor stats
export async function GET() {
  try {
    if (isPlaceholderSupabase()) {
      return NextResponse.json(buildEmptyStats());
    }

    const supabase = createAdminClient();

    const now = new Date();

    // Date boundaries
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const startOf30Days = new Date(now);
    startOf30Days.setDate(now.getDate() - 29);
    startOf30Days.setHours(0, 0, 0, 0);

    // All-time count
    const { count: allTime } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    // Today count
    const { count: todayCount } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfToday.toISOString());

    // This week count
    const { count: weekCount } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfWeek.toISOString());

    // This month count
    const { count: monthCount } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString());

    // Last 30 days grouped by date — for the bar chart
    const { data: dailyRows } = await supabase
      .from('page_views')
      .select('created_at')
      .gte('created_at', startOf30Days.toISOString())
      .order('created_at', { ascending: true });

    // Top pages visited — last 30 days
    const { data: pageRows } = await supabase
      .from('page_views')
      .select('page')
      .gte('created_at', startOf30Days.toISOString());

    // Group daily rows by YYYY-MM-DD
    const dailyMap: Record<string, number> = {};
    (dailyRows || []).forEach((row) => {
      const day = row.created_at.slice(0, 10);
      dailyMap[day] = (dailyMap[day] || 0) + 1;
    });

    // Build a 30-day ordered array
    const daily30: { date: string; visits: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      daily30.push({ date: key, visits: dailyMap[key] || 0 });
    }

    // Count page hits
    const pageMap: Record<string, number> = {};
    (pageRows || []).forEach((row) => {
      const p = row.page || '/';
      pageMap[p] = (pageMap[p] || 0) + 1;
    });

    // Sort and return top 8 pages
    const topPages = Object.entries(pageMap)
      .map(([page, visits]) => ({ page, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 8);

    return NextResponse.json({
      today: todayCount ?? 0,
      this_week: weekCount ?? 0,
      this_month: monthCount ?? 0,
      all_time: allTime ?? 0,
      daily_30: daily30,
      top_pages: topPages,
    });
  } catch (err) {
    console.error('pageview GET error:', err);
    return NextResponse.json(buildEmptyStats());
  }
}

function buildEmptyStats() {
  const daily30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return { date: d.toISOString().slice(0, 10), visits: 0 };
  });
  return {
    today: 0,
    this_week: 0,
    this_month: 0,
    all_time: 0,
    daily_30: daily30,
    top_pages: [],
  };
}
