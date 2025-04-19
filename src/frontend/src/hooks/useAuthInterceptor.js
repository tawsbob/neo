"use client";

import { useEffect } from 'react';
import { AuthManager } from '@/utils/auth';

/**
 * Hook that sets up a fetch interceptor to add authentication tokens to requests
 * Must be used in a client component
 */
export function useAuthInterceptor() {
  useEffect(() => {
    // Store the original fetch function
    const originalFetch = window.fetch;
    
    // Override the global fetch function with our interceptor
    window.fetch = async function(url, options = {}) {
      // Skip interceptor for non-API calls or if already has Authorization header
      const isApiCall = typeof url === 'string' && (
        url.startsWith('/api/') || 
        url.includes('localhost') || 
        url.includes(process.env.NEXT_PUBLIC_API_URL || '')
      );
      
      const hasAuthHeader = options.headers && 
        (options.headers.Authorization || options.headers.get?.('Authorization'));
      
      // Only add auth token to API calls without existing auth headers
      if (isApiCall && !hasAuthHeader) {
        const token = AuthManager.getToken();
        
        if (token) {
          // Create new headers with auth token
          const headers = new Headers(options.headers || {});
          headers.set('Authorization', `Bearer ${token}`);
          
          // Update options with new headers
          options = {
            ...options,
            headers
          };
        }
      }
      
      // Call the original fetch with possibly modified options
      return originalFetch(url, options);
    };
    
    // Cleanup function to restore original fetch
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
} 