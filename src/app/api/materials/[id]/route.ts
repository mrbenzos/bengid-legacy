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

    if (body.priceOnRequest !== undefined) {
      body.price_on_request = Boolean(body.priceOnRequest);
      body.priceOnRequest = Boolean(body.priceOnRequest);
    } else if (body.price_on_request !== undefined) {
      body.priceOnRequest = Boolean(body.price_on_request);
      body.price_on_request = Boolean(body.price_on_request);
    }

    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    let existingMaterial = null;
    let updatedMaterial = null;

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data } = await supabase.from('materials').select('*').eq('id', id).single();
        if (data) {
          existingMaterial = data;

          // Build Supabase payload — strip camelCase fields that are not DB columns
          const supabaseData: Record<string, unknown> = { ...body };
          delete supabaseData.priceOnRequest;

          // Attempt update; if price_on_request column doesn't exist yet (PGRST204 / 42703),
          // retry without it so the rest of the record still saves successfully.
          let { data: updated, error: updateErr } = await supabase
            .from('materials')
            .update(supabaseData)
            .eq('id', id)
            .select()
            .single();

          if (updateErr && (updateErr.code === 'PGRST204' || updateErr.code === '42703')) {
            console.warn('[materials PUT] price_on_request column not yet in Supabase — retrying without it. Run migration SQL to add the column.');
            delete supabaseData.price_on_request;
            const retry = await supabase
              .from('materials')
              .update(supabaseData)
              .eq('id', id)
              .select()
              .single();
            updated   = retry.data;
            updateErr = retry.error;
          }

          if (!updateErr && updated) {
            // Merge the priceOnRequest flag into the response so the frontend stays consistent
            updatedMaterial = {
              ...updated,
              priceOnRequest:   body.priceOnRequest   ?? false,
              price_on_request: body.price_on_request ?? false,
            };
          }
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

