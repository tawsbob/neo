import jwt from 'jsonwebtoken';

// Secret key for JWT signing - use environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Generate a JWT token for a user
 * @param userId The user ID to include in the token
 * @returns The generated JWT token
 */
export const generateToken = ({id, role}: {id: number, role: string}): string => {
  return jwt.sign({ id, role }, JWT_SECRET, {
    expiresIn: '7d', // Token expires in 7 days
  });
};

/**
 * Verify and decode a JWT token
 * @param token The token to verify
 * @returns The decoded token payload or null if invalid
 */
export const verifyToken = (token: string): { id: number } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number };
  } catch (error) {
    return null;
  }
}; 