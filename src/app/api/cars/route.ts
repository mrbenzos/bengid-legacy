import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendAlertSMS } from '@/lib/alerts';
import { getLocalCars, addLocalCar } from '@/lib/dataStore';

export async function GET() {
  try {
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data: cars, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && cars) {
          return NextResponse.json(cars, { status: 200 });
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using local store:', err);
      }
    }

    const localCars = getLocalCars();
    return NextResponse.json(localCars, { status: 200 });
  } catch (error) {
    console.error('Cars GET error:', error);
    return NextResponse.json(getLocalCars(), { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { model_name, year, price, image_url, status } = body;

    if (!model_name) {
      return NextResponse.json({ error: 'Model name is required' }, { status: 400 });
    }

    const numericYear = year ? Number(year) : null;
    const numericPrice = price !== undefined && price !== null && price !== '' ? Number(price) : null;
    const formattedStatus = (status || 'available').toLowerCase() === 'sold' ? 'sold' : 'available';

    const images: { label: string; url: string }[] = Array.isArray(body.images)
      ? body.images.filter((i: { url?: string }) => i && i.url)
      : [];
    const mainImage = image_url || images[0]?.url || null;

    const full = {
      model_name,
      vehicle_type: body.vehicle_type || 'Salon',
      brand: body.brand || '',
      year: numericYear,
      price: numericPrice,
      color: body.color || null,
      fuel_type: body.fuel_type || null,
      seating_capacity: body.seating_capacity ? Number(body.seating_capacity) : null,
      overview: body.overview || null,
      licence_number: body.licence_number || null,
      registration_type: body.registration_type || null,
      accessories: Array.isArray(body.accessories) ? body.accessories : [],
      images,
      image_url: mainImage,
      status: formattedStatus as 'available' | 'sold',
    };

    let createdItem;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data: car, error } = await supabase
          .from('cars')
          .insert(full)
          .select()
          .single();

        if (!error && car) {
          createdItem = car;
        } else if (error) {
          console.warn('Supabase insert error, using local store:', error.message);
        }
      } catch (err) {
        console.warn('Supabase insert failed, using local store:', err);
      }
    }

    if (!createdItem) {
      createdItem = addLocalCar({ sku: null, ...full });
    }

    await sendAlertSMS('created', 'car', `${model_name} ${numericYear || ''}`.trim());

    return NextResponse.json(createdItem, { status: 201 });
  } catch (error) {
    console.error('Cars POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

