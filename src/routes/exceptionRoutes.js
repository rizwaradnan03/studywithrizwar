//error root path
const errorRootPath = ["/404"];

//authentication root path
const authRootPath = ["/auth/login", "/auth/register"];

//email root path
const emailRootPath = ["/email/forgot-password"];

export const exceptionRoutes = [
  "/",
  ...errorRootPath,
  ...authRootPath,
  ...emailRootPath,
];
