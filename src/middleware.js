import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware);

export const config = {
  matcher: [
    '/dashboard',
    '/class/classlist',
    '/class/detail/:path*'
  ]
};
