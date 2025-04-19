/**
 * Shortlink service for handling API interactions
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

// Shortlink API services
export const ShortlinkService = {
  /**
   * Create a new shortlink
   * @param {Object} shortlinkData - Shortlink data (url, preserveParams)
   * @returns {Promise<Object>} Created shortlink data
   */
  createShortlink: async (shortlinkData) => {
    return apiRequest('/api/shortlink', 'POST', shortlinkData);
  },

  /**
   * Get all shortlinks for the current user
   * @returns {Promise<Array>} List of user's shortlinks
   */
  getUserShortlinks: async () => {
    return apiRequest('/api/model/ShortLink/findMany', 'GET');
  }
}; 