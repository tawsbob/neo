"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LINKS } from "@/utils/links";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading) {
      // Redirect to dashboard if authenticated, otherwise to login
      if (isAuthenticated) {
        router.replace(LINKS.DASHBOARD);
      } else {
        router.replace(LINKS.LOGIN);
      }
    }
  }, [isAuthenticated, isLoading, router]);
  
  // Show simple loading while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
