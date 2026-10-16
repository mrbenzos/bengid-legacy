import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendAlertSMS } from '@/lib/alerts';
import { getLocalMaterials, addLocalMaterial } from '@/lib/dataStore';

export async function GET() {
  try {
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    
    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data: materials, error } = await supabase
          .from('materials')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && materials) {
          return NextResponse.json(materials, { status: 200 });
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using local store:', err);
      }
    }

    const localMaterials = getLocalMaterials();
    return NextResponse.json(localMaterials, { status: 200 });
  } catch (error) {
    console.error('Materials GET error:', error);
    return NextResponse.json(getLocalMaterials(), { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, brand, color, overview, features, images, price, unit, image_url, stock_status, priceOnRequest, price_on_request } = body;

    const isPriceOnRequest = Boolean(priceOnRequest || price_on_request);

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
    }

    if (!isPriceOnRequest && (price === undefined || price === null || isNaN(Number(price)))) {
      return NextResponse.json({ error: 'Price is required when Contact for Price is disabled' }, { status: 400 });
    }

    const numericPrice = isPriceOnRequest ? (Number(price) || 0) : Number(price);
    const formattedUnit = unit || 'per roll';
    
    // Fix: Supabase check constraint requires 'in_stock' or 'out_of_stock'
    let formattedStock = 'in_stock';
    if (stock_status && stock_status.toLowerCase().includes('out')) {
      formattedStock = 'out_of_stock';
    }

    let createdItem;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const insertPayload: Record<string, unknown> = {
          name, category, brand, color, overview, features, images,
          price: numericPrice, price_on_request: isPriceOnRequest,
          unit: formattedUnit, image_url, stock_status: formattedStock
        };

        let { data: material, error } = await supabase
          .from('materials')
          .insert(insertPayload)
          .select()
          .single();

        // If price_on_request column doesn't exist yet, retry without it
        if (error && (error.code === 'PGRST204' || error.code === '42703' || error.code === '23502')) {
          console.warn('[materials POST] price_on_request column not in Supabase yet — retrying without it.');
          delete insertPayload.price_on_request;
          const retry = await supabase
            .from('materials')
            .insert(insertPayload)
            .select()
            .single();
          material = retry.data;
          error    = retry.error;
        }

        if (!error && material) {
          createdItem = { ...material, priceOnRequest: isPriceOnRequest, price_on_request: isPriceOnRequest };
        }
      } catch (err) {
        console.warn('Supabase insert failed, using local store:', err);
      }
    }

    if (!createdItem) {
      createdItem = addLocalMaterial({
        sku: null,
        name,
        category,
        brand: brand || null,
        color: color || null,
        overview: overview || null,
        features: features || [],
        images: images || [],
        price: numericPrice,
        priceOnRequest: isPriceOnRequest,
        price_on_request: isPriceOnRequest,
        unit: formattedUnit,
        image_url: image_url || null,
        stock_status: formattedStock,
      });
    }

    // Trigger real SMS alert via Vynfy to 0538973984
    await sendAlertSMS('created', 'material', name);

    return NextResponse.json(createdItem, { status: 201 });
  } catch (error) {
    console.error('Materials POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

