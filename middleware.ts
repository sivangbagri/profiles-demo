// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';

// const botUserAgents = [
//   'Twitterbot',
//   'Googlebot',
//   'Bingbot',
//   'FacebookExternalHit',
//   // Add any other bot user agents here
// ];

// export function middleware(req: NextRequest) {
//   const userAgent = req.headers.get('user-agent');

//   // Skip middleware logic if it's a bot (i.e., let crawlers pass freely)
//   if (botUserAgents.some(agent => userAgent?.includes(agent))) {
//     return NextResponse.next();
//   }

//   // Your normal middleware logic here, such as handling cookies
//   const cookieStore = req.cookies;
//   const surveyCompletedCookie = cookieStore.get('surveyCompleted');
  
//   if (!surveyCompletedCookie) {
//     return NextResponse.redirect('/');
//   }
  
//   return NextResponse.next();
// }

// export const config = {
//   matcher: '/result/:path*',
// };
