/**
 * Authentication manager for handling auth state
 */
import { CookieManager, LocalStorageManager } from './storage';

// Auth storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export const AuthManager = {
  /**
   * Set authentication data
   * @param {Object} user - User data
   * @param {string} token - JWT token
   */
  setAuth: (user, token) => {
    // Store in both localStorage and cookies for better persistence
    LocalStorageManager.set(AUTH_TOKEN_KEY, token);
    LocalStorageManager.set(AUTH_USER_KEY, user);
    
    // Set in cookie with shorter expiry for additional security
    CookieManager.set(AUTH_TOKEN_KEY, token, 7); // 7 days expiry
  },

  /**
   * Get stored authentication token
   * @returns {string|null} JWT token
   */
  getToken: () => {
    // Try to get from localStorage first, then from cookie
    return LocalStorageManager.get(AUTH_TOKEN_KEY) || CookieManager.get(AUTH_TOKEN_KEY);
  },

  /**
   * Get stored user data
   * @returns {Object|null} User data
   */
  getUser: () => {
    return LocalStorageManager.get(AUTH_USER_KEY);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    return !!AuthManager.getToken();
  },

  /**
   * Clear all authentication data
   */
  logout: () => {
    LocalStorageManager.remove(AUTH_TOKEN_KEY);
    LocalStorageManager.remove(AUTH_USER_KEY);
    CookieManager.remove(AUTH_TOKEN_KEY);
  }
}; 