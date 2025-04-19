"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '@/services/auth.service';
import { AuthManager } from '@/utils/auth';
import { useAuthInterceptor } from '@/hooks/useAuthInterceptor';

// Create auth context
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set up auth interceptor
  useAuthInterceptor();

  // Load user data on initial render
  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUser = AuthManager.getUser();
        const isAuthenticated = AuthManager.isAuthenticated();
        
        if (isAuthenticated && storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
        // Clear potentially corrupted auth data
        AuthManager.logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(email, password);
      const { user, jwt } = response;
      
      AuthManager.setAuth(user, jwt);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Invalid credentials' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(userData);
      const { user, jwt } = response;
      
      AuthManager.setAuth(user, jwt);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      AuthManager.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 