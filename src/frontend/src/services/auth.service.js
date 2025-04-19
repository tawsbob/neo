/**
 * Authentication service for handling API interactions
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Helper function for API requests
const apiRequest = async (endpoint, method, data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'API request failed');
  }

  return result;
};

// Authentication API services
export const AuthService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{user: Object, jwt: string}>} User data and JWT token
   */
  login: async (email, password) => {
    return apiRequest('/api/auth/login', 'POST', { email, password });
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<{user: Object, jwt: string}>} User data and JWT token
   */
  register: async (userData) => {
    return apiRequest('/api/auth/register', 'POST', userData);
  },

  /**
   * Logout user (client-side only)
   * For a complete logout, use this along with AuthManager.logout()
   */
  logout: async () => {
    // For future server-side logout implementation
    // return apiRequest('/api/auth/logout', 'POST');
    return Promise.resolve();
  }
}; 