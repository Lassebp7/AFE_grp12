import { UserRoles } from "@/app/types";
import { decodeJwt } from "jose";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import { BackendJWTPayload } from "./auth-types";

const publicRoutes = ["/", "/login"];

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = z
          .object({ email: z.email(), password: z.string().min(1) })
          .safeParse(credentials);

        if (!parsed.success) return null; // Maybe some more error handling here

        const res = await fetch(`${process.env.BACKEND_URL}/Users/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(parsed.data),
        });
        if (!res.ok) {
          return null;
        }
        const data = await res.json();
        const jwt = data.jwt;

        const claims = decodeJwt(jwt) as unknown as BackendJWTPayload;

        return {
          id: claims.UserId as string,
          name: claims.Name as string,
          role: claims.Role as UserRoles,
          groupId: claims.GroupId as string,
          token: jwt,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

      if (isPublicRoute) {
        if (isLoggedIn && nextUrl.pathname === "/login") {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
    jwt({ token, user }) {
      if (user) {
        token.Role = user.role;
        token.UserId = user.id;
        token.token = user.token;
        token.groupId = user.groupId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role as UserRoles;
      session.user.groupId = token.groupId;
      session.user.token = token.token;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
