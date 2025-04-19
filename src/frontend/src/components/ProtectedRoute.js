"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LINKS } from '@/utils/links';

/**
 * Higher-order component that protects routes from unauthenticated access
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The content to display if authenticated
 * @param {string} props.redirectTo - The path to redirect to if not authenticated, defaults to /login
 * @returns {React.ReactNode} The children if authenticated, otherwise null while redirecting
 */
export default function ProtectedRoute({
  children,
  redirectTo = LINKS.LOGIN,
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after initial loading state to avoid flash of redirect
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isLoading, isAuthenticated, router, redirectTo]);

  // Don't render children while initial loading, prevents flash of protected content
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="spinner" aria-label="Loading"></div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? children : null;
} 