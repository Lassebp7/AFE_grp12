// import { NextResponse } from "next/server";
// import { auth } from "../auth/auth";

// // https://nextjs.org/docs/app/guides/backend-for-frontend#proxy

// // anyone can visit these
// const publicRoutes = ["/", "/login"];

// export const config = {
//   matcher: ["/((?!api/auth|public|_next/static|_next/image|favicon.ico).*)"],
// };

// // 4. Export the main middleware function
// export default async function middleware(req) {
//   // The 'auth' function runs the authorization logic defined in your NextAuth config
//   // It returns the NextAuth response (including auth status and user data).
//   const session = await auth();
//   const url = req.nextUrl;

//   const isLoggedIn = !!session?.user;
//   const isPublicRoute = publicRoutes.includes(url.pathname);

//   // If the path is public, just allow it to proceed.
//   if (isPublicRoute) {
//     // Optional: Redirect logged-in users away from /login
//     if (isLoggedIn && url.pathname === "/login") {
//       return NextResponse.redirect(new URL("/dashboard", url));
//     }
//     return NextResponse.next();
//   }

//   // If the path is private and the user is NOT logged in, redirect them to login.
//   if (!isLoggedIn) {
//     // You can redirect to /login and pass a `callbackUrl` so the user is returned
//     // to their original destination after login.
//     return NextResponse.redirect(
//       new URL(`/login?callbackUrl=${url.pathname}`, url)
//     );
//   }

//   // If logged in and on a private page, allow access.
//   return NextResponse.next();
// }
