import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/api/:path*/checkout',
    '/api/:path*/verify-payment',
    '/api/:path*/create-subscription',
    '/api/:path*/verify-subscription-payment',
    '/api/:path*',
    '/'
  ]
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};