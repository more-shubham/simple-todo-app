import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute  = createRouteMatcher(['/sign-in', '/sign-up'])

export default clerkMiddleware((auth, req) => {
  if (!isProtectedRoute(req) && !auth()?.userId) return auth().redirectToSignIn();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};