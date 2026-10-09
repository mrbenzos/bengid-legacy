import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedName}`;

    // 1. Try Supabase Storage if configured and not placeholder
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filename, buffer, {
            contentType: file.type,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(filename);

          return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 200 });
        }
      } catch (err) {
        console.warn('Supabase storage upload failed, falling back to local file storage:', err);
      }
    }

    // 2. Local file storage fallback to public/uploads
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

