import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'cw_admin_session';
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'creativee-world-super-secret-session-key-2026-jaipur-growth'
);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();

  // Legacy admin path redirect to canonical /admin
  const legacyAdminPath = '/cw-control-x7k9m2';
  if (pathname.startsWith(legacyAdminPath)) {
    const targetPath = pathname.replace(legacyAdminPath, '/admin') || '/admin/dashboard';
    const redirectUrl = new URL(targetPath, request.url);
    return NextResponse.redirect(redirectUrl, { status: 301 });
  }

  // Only apply logic to /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === '/admin/login';
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let isValidSession = false;
  if (token) {
    try {
      await jwtVerify(token, SECRET_KEY);
      isValidSession = true;
    } catch {
      isValidSession = false;
    }
  }

  // If user is accessing login page while already authenticated -> redirect to dashboard
  if (isLoginPage && isValidSession) {
    const redirectUrl = new URL('/admin/dashboard', request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
    return response;
  }

  // Protected admin routes require valid authentication
  if (!isLoginPage && !isValidSession) {
    const loginUrl = new URL('/admin/login', request.url);
    const response = NextResponse.redirect(loginUrl);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
    return response;
  }

  // Create response and attach strict security & noindex headers
  const response = NextResponse.next();
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/cw-control-x7k9m2/:path*',
  ],
};
