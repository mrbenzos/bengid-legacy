import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendAlertSMS } from '@/lib/alerts';
import { getLocalLeads, addLocalLead } from '@/lib/dataStore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get('division');
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

        if (division && division !== 'all') {
          query = query.eq('division', division);
        }

        const { data: leads, error } = await query;
        if (!error && leads) {
          return NextResponse.json(leads, { status: 200 });
        }
      } catch (err) {
        console.warn('Supabase fetch leads failed, using local store:', err);
      }
    }

    const localLeads = getLocalLeads(division);
    return NextResponse.json(localLeads, { status: 200 });
  } catch (error) {
    console.error('Leads GET error:', error);
    return NextResponse.json(getLocalLeads(), { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message, division } = body;

    if (!name || !phone || !division) {
      return NextResponse.json({ error: 'Name, phone, and division are required' }, { status: 400 });
    }

    let createdLead;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data: lead, error } = await supabase
          .from('leads')
          .insert({ name, phone, message, division })
          .select()
          .single();

        if (!error && lead) {
          createdLead = lead;
        }
      } catch (err) {
        console.warn('Supabase insert lead failed, using local store:', err);
      }
    }

    if (!createdLead) {
      createdLead = addLocalLead({
        name,
        phone,
        message: message || null,
        division,
      });
    }

    await sendAlertSMS('new_lead', 'lead', `New ${division} lead from ${name} (${phone})`);

    return NextResponse.json(createdLead, { status: 201 });
  } catch (error) {
    console.error('Leads POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

