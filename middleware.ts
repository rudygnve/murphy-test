import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export async function middleware(request: Request) {
  const session = await auth();

  const emailVerified: boolean = true;

  if (
    !session?.user &&
    (request.url.includes("/dashboard") || request.url.includes("/verify"))
  )
    return NextResponse.redirect(new URL("/login", request.url));

  if (session?.user && !emailVerified && request.url.includes("/dashboard"))
    return NextResponse.redirect(new URL("/verify", request.url));

  if (
    session?.user &&
    (request.url.includes("/login") || request.url.includes("/sign-up"))
  )
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (session?.user && emailVerified && request.url.includes("/verify"))
    return NextResponse.redirect(new URL("/dashboard", request.url));
}

// // export const config = {
// //   matcher: ["/dashboard"],
// // };

// export { auth as middleware } from "@/auth";
