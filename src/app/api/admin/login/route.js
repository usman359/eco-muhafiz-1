import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  getExpectedSessionToken,
  verifyPassword,
} from '@/lib/admin-auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const password = body?.password;

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const token = await getExpectedSessionToken();
    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.error('POST /api/admin/login error:', error);
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
