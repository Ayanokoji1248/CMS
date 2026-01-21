import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // 🔑 MUST match cookie name set by FastAPI
    const accessToken = req.cookies.get("access_token");

    const isAuthRoute = pathname === "/";
    const isProtectedRoute =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/department") ||
        pathname.startsWith("/subject") ||
        pathname.startsWith("/faculty") ||
        pathname.startsWith("/student");

    // 🚫 Not logged in → trying to access protected routes
    if (isProtectedRoute && !accessToken) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // 🚫 Logged in → trying to access login page
    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/department/:path*",
        "/subject/:path*",
        "/faculty/:path*",
        "/student/:path*",
    ],
};
