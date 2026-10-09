import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendSMS } from '@/lib/vynfy';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
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

    // Map specific emails to their designated phone numbers
    let adminPhone = process.env.ADMIN_PHONE; 
    if (email === 'admin@bengidlegacy.com') {
      adminPhone = '233241749931';
    } else if (email === 'benzosjeff430@gmail.com') {
      adminPhone = '233538973984';
    }

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
