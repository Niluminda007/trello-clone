import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  inviteRoutes,
} from "@/routes";
import { auth as getAuth } from "@/auth";
import { cookies } from "next/headers";
const { auth } = NextAuth(authConfig);

export default auth(async (req, res) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = isPublicRoutePattern(nextUrl.pathname);
  const isInviteRoute = isInviteRoutePattern(nextUrl.pathname);

  const session = await getAuth();
  const workspaceId = session?.user.workspaceId;
  const isOAuth = !!session?.user.isOAuth;

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // handle board invited users for OAuth login
      const boardId = cookies().get("invited-board-id")?.value;
      if (isOAuth && boardId) {
        return NextResponse.redirect(new URL(`/b/${boardId}`, nextUrl));
      }
      if (workspaceId) {
        return NextResponse.redirect(new URL(`/w/${workspaceId}`, nextUrl));
      }
      return NextResponse.redirect(new URL(`/select-workspace`, nextUrl));
    }
    return NextResponse.next();
  }

  if (isLoggedIn && isPublicRoute) {
    if (workspaceId) {
      return NextResponse.redirect(new URL(`/w/${workspaceId}`, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute && !isInviteRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
});

function isPublicRoutePattern(pathname: string): boolean {
  return publicRoutes.some((route) =>
    new RegExp(`^${route.replace("*", ".*")}$`).test(pathname)
  );
}

function isInviteRoutePattern(pathname: string): boolean {
  return inviteRoutes.some((route) =>
    new RegExp(`^${route.replace("*", ".*")}$`).test(pathname)
  );
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
