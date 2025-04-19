import { Context, Next } from 'hono';
import { PrismaClient } from '../../generated/prisma';
import { verifyToken } from '../utils/jwt';

/**
 * Authentication middleware that verifies JWT token
 * and attaches user data to the request context
 */
export const authMiddleware = (prisma: PrismaClient) => {
  return async (c: Context, next: Next) => {
    try {
      // Get authorization header
      const authHeader = c.req.header('Authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // No token provided, but still continue to next middleware
        // Protected routes should check c.get('user') exists
        await next();
        return;
      }
      
      // Extract token
      const token = authHeader.substring(7);
      console.log(token)
      // Verify token
      const payload = verifyToken(token);
      console.log(payload)
      if (!payload) {
        // Invalid token, but still continue to next middleware
        await next();
        return;
      }
      
      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          email: true,
          name: true,
          lastName: true,
          emailVerified: true,
          role: true,
        },
      });
      
      if (user) {
        // Attach user to context
        c.set('user', user);
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
    }
    
    await next();
  };
}; 