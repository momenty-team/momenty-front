import { NextResponse, type NextRequest } from 'next/server';
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

function applySetCookie(req: NextRequest, res: NextResponse): void {
  const resCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  resCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === "x-middleware-override-headers" ||
      key.startsWith("x-middleware-request-")
    ) {
      res.headers.set(key, value);
    }
  });
}

export default function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  if (accessToken && refreshToken) {
    const response = NextResponse.next();

    response.cookies.set('access_token', accessToken.value);
    response.cookies.set('refresh_token', refreshToken.value);

    applySetCookie(request, response);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/alarm',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};


