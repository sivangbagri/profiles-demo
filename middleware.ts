import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if the 'surveyCompleted' cookie exists
  const surveyCompleted = req.cookies.get('surveyCompleted');

  // Redirect to homepage if cookie is missing
  if (!surveyCompleted) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to continue if the cookie exists
  return NextResponse.next();
}

// Apply middleware only to the result route
export const config = {
  matcher: '/result/:path*', // Matches all routes under /result/
};
