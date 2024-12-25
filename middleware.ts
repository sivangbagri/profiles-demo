import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /googlebot/i,
    /bingbot/i,
    /yahoo/i,
    /duckduckbot/i,
  ];
  return botPatterns.some((pattern) => pattern.test(userAgent));
}

export function middleware(request: NextRequest) {
  console.log("Middleware XXXXXXXXx");
  const userAgent = request.headers.get("user-agent") || "";
  const isUserBot = isBot(userAgent);
  const surveyCompleted = request.cookies.get("surveyCompleted");

  // Check if the request is for the result page
  if (request.nextUrl.pathname.startsWith("/result/")) {
    const archetype = request.nextUrl.pathname.split("/")[2];
    const validArchetypes = [
      "Visionary",
      "Strategist",
      "Diplomat",
      "Challenger",
      "Thinker",
      "Achiever",
      "Stoic",
      "Explorer",
      "Realist",
      "Guardian",
    ];

    if (validArchetypes.includes(archetype) && !surveyCompleted && !isUserBot) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/result/:archetype*",
};
