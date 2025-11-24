import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login", // custom admin login page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const isOnAdmin = pathname.startsWith("/admin");
      const isOnAdminLogin = pathname === "/admin/login";

      // Protect all /admin routes except the login page
      if (isOnAdmin && !isOnAdminLogin) {
        if (isLoggedIn) return true;
        return false; // will send to /admin/login
      }

      return true; // public routes
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour in seconds
  },
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
      },
    },
  },
  providers: [], // will be overridden in auth.ts
} satisfies NextAuthConfig;
