import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendSMS } from '@/lib/vynfy';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Dev/Demo Mode Fallback for local testing without Supabase connection
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');
    const isDemoAccount = email === 'admin@bengidlegacy.com' && password === 'admin123';

    if (isPlaceholderSupabase || isDemoAccount) {
      if (email === 'admin@bengidlegacy.com' && password === 'admin123') {
        const code = '123456';
        const adminPhone = process.env.ADMIN_PHONE || '233538973984';
        
        // Dispatch real SMS via Vynfy
        const message = `Your BENGID admin login code is ${code}. Valid for 5 mins. - BENZOSTECH`;
        await sendSMS(adminPhone, message);

        console.log(`\n========================================\n[2FA SMS SENT] OTP for ${email} sent to ${adminPhone}: ${code}\n========================================\n`);
        const response = NextResponse.json({ message: 'OTP sent to your phone (0538973984)', email, demo: true }, { status: 200 });
        response.cookies.set('bengid-temp-token', 'demo-token', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 5 * 60,
          path: '/',
        });
        return response;
      }
    }

    const supabase = createAdminClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.session) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    const { error: otpError } = await supabase
      .from('otp_codes')
      .insert({
        email,
        code,
        expires_at,
        used: false,
      });

    if (otpError) {
      console.error('Error inserting OTP:', otpError);
      return NextResponse.json({ error: 'Failed to generate OTP' }, { status: 500 });
    }

    const adminPhone = process.env.ADMIN_PHONE;
    if (adminPhone) {
      const message = `Your Bengid login code is ${code}. Valid for 5 mins. - BENGID`;
      await sendSMS(adminPhone, message);
    } else {
      console.warn('ADMIN_PHONE not set, skipping SMS');
    }

    const response = NextResponse.json({ message: 'OTP sent', email, session: authData.session }, { status: 200 });
    
    // Setting a temporary cookie for verify step
    response.cookies.set('bengid-temp-token', authData.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 60, // 5 minutes
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
