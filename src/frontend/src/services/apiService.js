/**
 * Service to handle API requests
 */

import { notEmpty } from "@/utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

/**
 * Generic function to make API requests
 * 
 * @param {string} endpoint - API endpoint
 * @param {Object} options - fetch options
 * @returns {Promise} - Response promise
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Get token from localStorage if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        throw { status: response.status, data };
      }
      
      return data;
    } else {
      const text = await response.text();
      
      if (!response.ok) {
        throw { status: response.status, data: text };
      }
      
      return text;
    }
  } catch (error) {
    // Handle network errors
    console.error('API request error:', error);
    throw error;
  }
};

/**
 * Make a model API request for a given model and operation
 * 
 * @param {string} modelName - The name of the model
 * @param {string} operation - The Prisma operation (e.g., findMany, create)
 * @param {Object} data - The data for the operation
 * @returns {Promise} - Response promise
 */



const modelApiRequest = async (modelName, operation, data = null) => {

  const operationMap = {
    findMany: 'GET',
    findUnique: 'GET',
    create: 'POST',
    update: 'PUT',
    delete: 'DELETE',
  }

  const method = operationMap[operation] || 'GET';
  
  const queryParams = method === 'GET' && notEmpty(data) 
  ? `?q=${JSON.stringify(data)}` 
  : '';

  const body = method !== 'GET' 
  ? JSON.stringify(data) 
  : undefined;

  return apiRequest(`/model/${modelName}/${operation}${queryParams}`, {
    method,
    body,
  });
};

// Bio Profile API functions
const bioProfileApi = {
  getAll: () => modelApiRequest('BioProfile', 'findMany'),
  getById: (id) => modelApiRequest('BioProfile', 'findUnique', { where: { id } }),
  create: (data) => modelApiRequest('BioProfile', 'create', { data }),
  update: (id, data) => modelApiRequest('BioProfile', 'update', { 
    where: { id },
    data
  }),
  delete: (id) => modelApiRequest('BioProfile', 'delete', { where: { id } }),
};

// Link In Bio API functions
const linkInBioApi = {
  getAll: (bioProfileId) => modelApiRequest('LinkInBio', 'findMany', { 
    where: { bioProfileId } 
  }),
  getById: (id) => modelApiRequest('LinkInBio', 'findUnique', { where: { id } }),
  create: (data) => modelApiRequest('LinkInBio', 'create', { data }),
  update: (id, data) => modelApiRequest('LinkInBio', 'update', { 
    where: { id },
    data
  }),
  delete: (id) => modelApiRequest('LinkInBio', 'delete', { where: { id } }),
};

export {
  apiRequest,
  modelApiRequest,
  bioProfileApi,
  linkInBioApi,
}; 