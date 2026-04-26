import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  const isAuthRoute = request.nextUrl.pathname.startsWith('/login');

  // ❌ No logueado → solo puede ir a /login
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ✅ Logueado → no puede regresar a login
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Rutas donde aplica
export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};