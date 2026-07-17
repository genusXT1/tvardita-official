import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, updateSession } from './lib/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();

  // Basic route protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname === '/login') {
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return await updateSession(request) ?? NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
