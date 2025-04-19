"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginForm from "@/components/_forms/LoginForm";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";
import { LINKS } from "@/utils/links";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.replace(LINKS.DASHBOARD);
    }
  }, [isAuthenticated, isLoading, router]);
  
  function handleLoginSuccess() {
    router.push(LINKS.DASHBOARD);
  }
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <p>Loading...</p>
          </div>
        </div>
      </main>
    );
  }
  
  // Don't show login form if already authenticated (will redirect via useEffect)
  if (isAuthenticated) {
    return null;
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <LoginForm onSuccess={handleLoginSuccess} />
      </div>
    </main>
  );
} 