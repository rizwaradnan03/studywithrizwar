import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathName = req.nextUrl.pathname;

    if (requireAuth.includes(pathName)) {
      const token = await getToken({
        req,
        secret: process.env.SECRET_KEY,
      });

      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      console.log("isi token", token);

      // Dapatkan peran pengguna dari token
      const userRolePaths = token.role_access_paths;
      console.log("isi user role path", userRolePaths);
      // Periksa apakah pengguna memiliki akses ke rute yang diminta
      const hasAccess = userRolePaths.some((route) => route.path === pathName);
      console.log("apakah punya akses", hasAccess);
      if (!hasAccess) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return middleware(req, next);
    }
    // else {
    //   const url = new URL("/auth/login", req.url);
    //   url.searchParams.set("callbackUrl", encodeURI(req.url));
    //   return NextResponse.redirect(url);
    // }
  };
}
