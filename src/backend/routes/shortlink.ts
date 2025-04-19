import { Hono } from 'hono';
import { PrismaClient } from '../../generated/prisma';
import { nanoid } from 'nanoid';
import { AuthUser } from '../types';

// Constants
const SHORT_ID_LENGTH = 8;

export const createShortlinkRoutes = (prisma: PrismaClient) => {
  const shortlinkRoutes = new Hono();

  /**
   * @route POST /api/shortlink
   * @description Create a new shortlink
   */
  shortlinkRoutes.post('/', async (c) => {
    try {
      // Get the authenticated user from context
      const user = c.get('user');
      
      if (!user) {
        return c.json({ error: 'Authentication required' }, 401);
      }
      
      // Get the request body
      const body = await c.req.json();
      
      // Validate required fields
      const { url } = body;
      if (!url) {
        return c.json({ error: 'URL is required' }, 400);
      }
      
      // Optional parameters
      const preserveParams = body.preserveParams || false;
      
      // Generate a unique shortId
      const shortId = nanoid(SHORT_ID_LENGTH);
      
      // Create the shortlink
      const shortLink = await prisma.shortLink.create({
        data: {
          url,
          shortId,
          preserveParams,
          userId: user.id
        }
      });
      
      return c.json(shortLink, 201);
    } catch (error) {
      console.error('Shortlink creation error:', error);
      return c.json({ error: 'An unexpected error occurred' }, 500);
    }
  });

  return shortlinkRoutes;
}; 