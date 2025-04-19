import { Hono } from 'hono';
import { PrismaClient } from '../../generated/prisma';
import { loginUser, registerUser } from '../utils/auth';
import { generateToken } from '../utils/jwt';

export const createAuthRoutes = (prismaProtected: PrismaClient, prismaUnsafe: PrismaClient) => {
  const authRoutes = new Hono();

  /**
   * @route POST /api/auth/register
   * @description Register a new user
   */
  authRoutes.post('/register', async (c) => {
    try {
      const body = await c.req.json();
      
      // Validate required fields
      const { email, password, name, lastName } = body;
      if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
      }
      
      // Register user
      const user = await registerUser(prismaProtected, {
        email,
        password,
        name,
        lastName,
      });
      
      if (!user) {
        return c.json({ error: 'User registration failed. Email may already be in use.' }, 400);
      }
      
      // Return user data and token
      const jwt = generateToken(user.id);
      return c.json({ user, jwt }, 201);
    } catch (error) {
      console.error('Registration error:', error);
      return c.json({ error: 'An unexpected error occurred' }, 500);
    }
  });

  /**
   * @route POST /api/auth/login
   * @description Authenticate user and get token
   */
  authRoutes.post('/login', async (c) => {
    try {
      const body = await c.req.json();
      
      // Validate required fields
      const { email, password } = body;
      if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400);
      }
      
      // Login user
      const result = await loginUser(prismaUnsafe, email, password);
      
      if (!result) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }
      
      return c.json(result);
    } catch (error) {
      console.error('Login error:', error);
      return c.json({ error: 'An unexpected error occurred' }, 500);
    }
  });

  return authRoutes;
}; 