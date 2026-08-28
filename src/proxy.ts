import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_FETCH_SITES = new Set(["same-origin", "same-site", "none"]);

export function proxy(request: NextRequest) {
  if (request.method !== "POST") {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (origin && origin !== request.nextUrl.origin) {
    return new NextResponse("Cross-origin request rejected.", {
      status: 403,
    });
  }

  if (fetchSite && !ALLOWED_FETCH_SITES.has(fetchSite)) {
    return new NextResponse("Cross-site request rejected.", {
      status: 403,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/api/:path*",
};
