import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();
    const supabase = createAdminClient();

    const { data: otp, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('used', false)
      .single();

    if (otpError || !otp) {
      return NextResponse.json({ error: 'Invalid OTP code' }, { status: 401 });
    }

    if (new Date(otp.expires_at) < new Date()) {
      return NextResponse.json({ error: 'OTP has expired' }, { status: 401 });
    }

    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({ used: true })
      .eq('id', otp.id);

    if (updateError) {
      console.error('Failed to update OTP status:', updateError);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    const response = NextResponse.json({ message: 'Verified successfully' }, { status: 200 });
    
    response.cookies.set('bengid-admin-session', email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/',
    });
    
    // Clear temp token
    response.cookies.delete('bengid-temp-token');

    return response;
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
