"use client";
import { useEffect } from "react";
import RegisterForm from "@/components/_forms/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LINKS } from "@/utils/links";
import styles from "./page.module.scss";

export default function RegisterPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push(LINKS.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  // Handle successful registration
  const handleRegistrationSuccess = () => {
    router.push(LINKS.DASHBOARD);
  };

  return (
    <div className={styles.pageContainer}>
      <RegisterForm onSuccess={handleRegistrationSuccess} />
    </div>
  );
} 