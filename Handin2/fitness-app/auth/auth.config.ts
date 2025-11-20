import NextAuth, { NextAuthConfig, DefaultSession, User } from "next-auth";
import {} from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { decodeJwt } from "jose";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role: string;
    rawjwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    Name: string;
    Role: string;
    UserId: string;
    GroupId: string;
    rawjwt: string;
  }
}

const publicRoutes = ["/", "/login"];

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

      if (isPublicRoute) {
        if (isLoggedIn && nextUrl.pathname === "/login") {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      if (isLoggedIn) {
        return true;
      }

      return false;
    },
    jwt({ token, user }) {
      if (user) {
        token.Role = user.role;
        token.UserId = user.id;
        token.rawjwt = user.rawjwt;
      }
      return token;
    },
    session({ session, token }) {
      if (token.Role) {
        session.user.role = token.Role as string;
      }
      session.user.rawjwt = token.rawjwt;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const response = await fetch(`${process.env.BACKEND_URL}/Users/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        const jwt = data.rawjwt;
        const claims = decodeJwt(jwt);

        const user: User = {
          id: claims.UserId as string,
          name: claims.Name as string,
          role: claims.Role as string,
          rawjwt: jwt,
        };
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
});
