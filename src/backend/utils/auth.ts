import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcrypt';
import { generateToken } from './jwt';

// User type
export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  lastName: string | null;
  emailVerified: boolean;
  role: string;
}

// Login response type
export interface LoginResponse {
  user: UserResponse;
  jwt: string;
}

/**
 * Verify user credentials and return user data with JWT
 */
export const loginUser = async (
  prisma: PrismaClient,
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  try {
    // Find user by email - we need to use the raw prisma client
    // to access the password field which is otherwise omitted by ZenStack
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    
    // Verify password - ZenStack uses bcrypt internally
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT token
    const jwt = generateToken({
      id: user.id,
      role: user.role,
    });

    return {
      user: userWithoutPassword,
      jwt,
    };
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

/**
 * Register a new user
 */
export const registerUser = async (
  prisma: PrismaClient,
  userData: {
    email: string;
    password: string;
    name?: string;
    lastName?: string;
  }
): Promise<UserResponse | null> => {
  try {
    // Create the user
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  } catch (error) {
    // Handle unique constraint violations or other errors
    console.error('Register error:', error);
    return null;
  }
}; 