export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware is used to redirect the user to the home page if they try to access a page that requires authentication
// the function here just redirects the user to the home page
// if this isn't passed then the user sees the callback in the url
// export function middleware(request: NextRequest) {
// 	return NextResponse.redirect(new URL("/", request.url));
// }

export const config = {
	matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
