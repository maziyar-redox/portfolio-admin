import authConfig from "@/auth.config";

import NextAuth from "next-auth";

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    rootRoute
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLogged = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isRootRoute = rootRoute.includes(nextUrl.pathname);
    if (isApiAuthRoute) {
        return undefined;
    };
    if (isAuthRoute) {
        if (isLogged) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        };
        return undefined;
    };
    if (!isLogged && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    };
    if (isLogged && isRootRoute) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    };
    return undefined;
});

// Optionally, don't invoke Middleware on some paths
// "/((?!api|_next/static|_next/image|favicon.ico).*)" this type of expression is not best
// cuz of that we are using the clerck one
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};