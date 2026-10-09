import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { evaluateRequestRateLimits } from './lib/rateLimit';

function getClientIp(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }
  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp.trim();
  }
  return request.ip || '127.0.0.1';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Authentication Check
  if (
    pathname.startsWith('/admin') &&
    !pathname.startsWith('/admin/login') &&
    !pathname.startsWith('/admin/verify')
  ) {
    const session = request.cookies.get('bengid-admin-session');

    if (!session?.value) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Rate Limiting Evaluation (production only - dev reloads would exhaust the quota)
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }
  const clientIp = getClientIp(request);
  const rateLimitResult = evaluateRequestRateLimits(clientIp, pathname);

  if (!rateLimitResult.success) {
    // If request exceeds rate limit
    if (pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too Many Requests',
          message: `Rate limit exceeded for ${rateLimitResult.matchedRule || 'Requests'}. Please try again later.`,
          rule: rateLimitResult.matchedRule,
          retryAfterSeconds: rateLimitResult.retryAfterSec,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(rateLimitResult.retryAfterSec),
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
            'X-RateLimit-Reset': String(rateLimitResult.resetMs),
          },
        }
      );
    }

    // HTML Page fallback for rate limit
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>429 Too Many Requests - BenGid</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; padding: 1rem; box-sizing: border-box; text-align: center; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; padding: 2.5rem 2rem; max-width: 480px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
    h1 { color: #f43f5e; font-size: 2rem; margin-top: 0; font-weight: 800; }
    p { color: #94a3b8; font-size: 1rem; line-height: 1.6; margin: 1rem 0 1.5rem; }
    .badge { display: inline-block; background: #334155; color: #38bdf8; font-family: monospace; padding: 0.5rem 1rem; border-radius: 0.5rem; font-size: 0.9rem; margin-bottom: 1rem; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: 600; transition: background 0.2s; }
    .btn:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="card">
    <h1>429 Too Many Requests</h1>
    <div class="badge">Tier: ${rateLimitResult.matchedRule || 'Global'}</div>
    <p>You have issued too many requests in a short period. To protect our servers and service costs, please wait <strong>${rateLimitResult.retryAfterSec} seconds</strong> before trying again.</p>
    <a href="/" class="btn">Return Home</a>
  </div>
</body>
</html>`,
      {
        status: 429,
        headers: {
          'Content-Type': 'text/html',
          'Retry-After': String(rateLimitResult.retryAfterSec),
          'X-RateLimit-Limit': String(rateLimitResult.limit),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          'X-RateLimit-Reset': String(rateLimitResult.resetMs),
        },
      }
    );
  }

  // 3. Attach Rate Limit headers to successful responses
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(rateLimitResult.limit));
  response.headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining));
  response.headers.set('X-RateLimit-Reset', String(rateLimitResult.resetMs));

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder static images/assets (.png, .jpg, .svg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
