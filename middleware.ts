import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'cw_admin_session';
const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'ceativee-world-super-secret-session-key-2026-jaipur-growth'
);

export async function middleware(request: NextRequest) {
  const adminPath = (process.env.ADMIN_PANEL_PATH || '/cw-control-x7k9m2').toLowerCase();
  const pathname = request.nextUrl.pathname.toLowerCase();

  // Only run middleware logic on admin panel route tree
  if (!pathname.startsWith(adminPath)) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === `${adminPath}/login`;
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

  // Handle open redirect protection on callback URL if passed
  const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
  let safeCallbackPath = `${adminPath}/dashboard`;
  if (callbackUrl && callbackUrl.startsWith(adminPath) && !callbackUrl.includes('//')) {
    safeCallbackPath = callbackUrl;
  }

  // If user is accessing login page while already authenticated -> redirect to dashboard/callback
  if (isLoginPage && isValidSession) {
    const redirectUrl = new URL(safeCallbackPath, request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
    return response;
  }

  // Protected admin routes require valid authentication
  if (!isLoginPage && !isValidSession) {
    const loginUrl = new URL(`${adminPath}/login`, request.url);
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
    /*
     * Match all admin panel routes dynamically using environment variable path or default
     */
    '/cw-control-x7k9m2/:path*',
    '/:path*',
  ],
};
