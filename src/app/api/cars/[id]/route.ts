import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendAlertSMS } from '@/lib/alerts';
import { getLocalCars, updateLocalCar, deleteLocalCar } from '@/lib/dataStore';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data, error } = await supabase.from('cars').select('*').eq('id', id).single();
        if (data && !error) {
          return NextResponse.json(data, { status: 200 });
        }
      } catch (err) {
        console.warn('Supabase GET failed, using local store:', err);
      }
    }

    const allLocal = getLocalCars();
    const existing = allLocal.find((c) => c.id === id);
    if (existing) {
      return NextResponse.json(existing, { status: 200 });
    }

    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  } catch (error) {
    console.error('Cars GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    let existingCar = null;
    let updatedCar = null;

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data } = await supabase.from('cars').select('*').eq('id', id).single();
        if (data) {
          existingCar = data;
          const { data: updated } = await supabase.from('cars').update(body).eq('id', id).select().single();
          if (updated) updatedCar = updated;
        }
      } catch (err) {
        console.warn('Supabase PUT car failed, using local store:', err);
      }
    }

    if (!updatedCar) {
      const allLocal = getLocalCars();
      existingCar = allLocal.find((c) => c.id === id) || null;
      updatedCar = updateLocalCar(id, body);
    }

    if (!updatedCar) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    const isMarkedSold = body.status && body.status.toLowerCase() === 'sold' && existingCar?.status?.toLowerCase() !== 'sold';
    if (isMarkedSold) {
      await sendAlertSMS('sold', 'car', `${updatedCar.model_name} ${updatedCar.year || ''} marked as SOLD`.trim());
    } else if (body.model_name !== undefined && body.model_name !== existingCar?.model_name) {
      await sendAlertSMS('modified', 'car', `${existingCar?.model_name} renamed to ${body.model_name}`);
    } else {
      await sendAlertSMS('modified', 'car', updatedCar.model_name);
    }

    return NextResponse.json(updatedCar, { status: 200 });
  } catch (error) {
    console.error('Cars PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    let deletedName = 'Car';
    let deletedSuccess = false;

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data: car } = await supabase.from('cars').select('*').eq('id', id).single();
        if (car) {
          deletedName = `${car.model_name} ${car.year || ''}`.trim();
          const { error } = await supabase.from('cars').delete().eq('id', id);
          if (!error) deletedSuccess = true;
        }
      } catch (err) {
        console.warn('Supabase DELETE car failed, using local store:', err);
      }
    }

    if (!deletedSuccess) {
      const allLocal = getLocalCars();
      const existing = allLocal.find((c) => c.id === id);
      if (existing) deletedName = `${existing.model_name} ${existing.year || ''}`.trim();
      deletedSuccess = deleteLocalCar(id);
    }

    if (deletedSuccess) {
      await sendAlertSMS('deleted', 'car', deletedName);
      return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Car not found' }, { status: 404 });
  } catch (error) {
    console.error('Cars DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

