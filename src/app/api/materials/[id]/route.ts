import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendAlertSMS } from '@/lib/alerts';
import { getLocalMaterials, updateLocalMaterial, deleteLocalMaterial } from '@/lib/dataStore';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data, error } = await supabase.from('materials').select('*').eq('id', id).single();
        if (data && !error) {
          return NextResponse.json(data, { status: 200 });
        }
      } catch (err) {
        console.warn('Supabase GET failed, using local store:', err);
      }
    }

    const allLocal = getLocalMaterials();
    const existing = allLocal.find((m) => m.id === id);
    if (existing) {
      return NextResponse.json(existing, { status: 200 });
    }

    return NextResponse.json({ error: 'Material not found' }, { status: 404 });
  } catch (error) {
    console.error('Materials GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await request.json();
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    let existingMaterial = null;
    let updatedMaterial = null;

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data } = await supabase.from('materials').select('*').eq('id', id).single();
        if (data) {
          existingMaterial = data;
          const { data: updated } = await supabase.from('materials').update(body).eq('id', id).select().single();
          if (updated) updatedMaterial = updated;
        }
      } catch (err) {
        console.warn('Supabase PUT failed, using local store:', err);
      }
    }

    if (!updatedMaterial) {
      const allLocal = getLocalMaterials();
      existingMaterial = allLocal.find((m) => m.id === id) || null;
      updatedMaterial = updateLocalMaterial(id, body);
    }

    if (!updatedMaterial) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    const oldPrice = existingMaterial ? existingMaterial.price : updatedMaterial.price;
    if (body.price !== undefined && Number(body.price) !== Number(oldPrice)) {
      await sendAlertSMS(
        'price_changed',
        'material',
        `${updatedMaterial.name} price changed from GHS ${oldPrice} to GHS ${updatedMaterial.price}`
      );
    } else {
      await sendAlertSMS('modified', 'material', updatedMaterial.name);
    }

    return NextResponse.json(updatedMaterial, { status: 200 });
  } catch (error) {
    console.error('Materials PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    let deletedName = 'Material';
    let deletedSuccess = false;

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data: material } = await supabase.from('materials').select('*').eq('id', id).single();
        if (material) {
          deletedName = material.name;
          const { error } = await supabase.from('materials').delete().eq('id', id);
          if (!error) deletedSuccess = true;
        }
      } catch (err) {
        console.warn('Supabase DELETE failed, using local store:', err);
      }
    }

    if (!deletedSuccess) {
      const allLocal = getLocalMaterials();
      const existing = allLocal.find((m) => m.id === id);
      if (existing) deletedName = existing.name;
      deletedSuccess = deleteLocalMaterial(id);
    }

    if (deletedSuccess) {
      await sendAlertSMS('deleted', 'material', deletedName);
      return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Material not found' }, { status: 404 });
  } catch (error) {
    console.error('Materials DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

