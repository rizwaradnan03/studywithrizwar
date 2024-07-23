import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default function withAuth(middleware) {
  return async (req, next) => {
    const pathName = req.nextUrl.pathname;

    const token = await getToken({
      req,
      secret: process.env.SECRET_KEY,
    });

    if (!token) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    const userRolePaths = token.role_access_paths;

    // Helper function to check if the path matches any pattern
const hasAccess = userRolePaths.some((route) => {
      const routePath = route.path;
      
      // Handle dynamic segments with regex
      if (routePath.includes(":")) {
        // Convert route pattern to regex
        const regexPath = new RegExp(
          "^" + routePath
            .replace(/:[\w]+/g, "[^/]+")   // Replace :param with [^/]+
            .replace(/\*/g, ".*")           // Replace * with .*
            + "$"
        );

        return regexPath.test(pathName);
      }

      // Exact path match
      return routePath === pathName;
    });

    if (!hasAccess) {
      console.log('gapunya akses', userRolePaths);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return middleware(req, next);
  };
}
