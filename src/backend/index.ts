import { PrismaClient } from '../generated/prisma';
import { enhance } from '@zenstackhq/runtime';
import { createHonoHandler } from '@zenstackhq/server/hono';
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'  
import { serve } from '@hono/node-server'
import { createAuthRoutes } from './routes/auth';
import { createShortlinkRoutes } from './routes/shortlink';
import { authMiddleware } from './middleware/auth';

// Initialize Prisma client
const prisma = new PrismaClient();
const app = new Hono()

const safePrisma = enhance(prisma, { user: { id: -1, role: 'ADMIN' } });

// Root endpoint
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Apply global authentication middleware
app.use('*', cors({
  origin: 'http://localhost:3001',
  credentials: true,
}))
app.use('*', authMiddleware(safePrisma));

// ZenStack model API
app.use(
  '/api/model/*',
  logger(),
  createHonoHandler({
      getPrisma: (ctx) => {
          // Use the authenticated user from context if available
          const user = ctx.get('user');
          return enhance(prisma, { user });
      },
  })
);

// Authentication routes
app.route('/api/auth', createAuthRoutes(
  safePrisma,
  prisma
));

// Shortlink routes
app.route('/api/shortlink', createShortlinkRoutes(
  safePrisma
));

// Start server
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
