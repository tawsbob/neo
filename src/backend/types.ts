import { UserRole } from '../generated/prisma';

// Define the Auth User type for the context with all the properties needed
export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  lastName: string | null;
  emailVerified: boolean;
  role: UserRole;
}

// Extend Hono's Context type declaration
declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser;
  }
} 