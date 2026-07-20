import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidSessionToken } from '@/lib/admin-auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const authenticated = await isValidSessionToken(token);

  const isAdminPage = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  const isContentApi =
    pathname.startsWith('/api/blogs') || pathname.startsWith('/api/case-studies');
  const isMutating =
    request.method === 'POST' ||
    request.method === 'PUT' ||
    request.method === 'DELETE' ||
    request.method === 'PATCH';

  if (isAdminPage && !isLoginPage && !authenticated) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  if (isContentApi && isMutating && !authenticated) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin',
    '/admin/:path*',
    '/api/blogs',
    '/api/blogs/:path*',
    '/api/case-studies',
    '/api/case-studies/:path*',
  ],
};
