
import { PrismaClient } from '../generated/prisma';
import { enhance } from '@zenstackhq/runtime';
import { createHonoHandler } from '@zenstackhq/server/hono';
import { Hono } from 'hono'
import { logger } from 'hono/logger'  

import { serve } from '@hono/node-server'

const prisma = new PrismaClient();
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(
  '/api/model/*',
  logger(),
  createHonoHandler({
      getPrisma: (ctx) => {
          return enhance(prisma, { user: null });
      },
  })
);


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
