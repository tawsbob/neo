# URL Shortener

A URL shortener service built with Node.js, TypeScript, Prisma ORM, and ZenStack.

## Setup

1. Start the PostgreSQL database:
```bash
docker-compose up -d
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run migrations:
```bash
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
```

## Technologies
- Node.js
- TypeScript
- Express.js
- Prisma ORM
- ZenStack
- PostgreSQL (via Docker) 