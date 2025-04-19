"use client";
import { useState } from "react";
import LoginForm from "@/components/_forms/LoginForm";
import styles from "./page.module.scss";

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {isLoggedIn ? (
          <div className={styles.success}>
            <h1>Welcome Back!</h1>
            <p>You have successfully logged in.</p>
            <button 
              className={styles.logoutButton}
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          </div>
        ) : (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}
      </div>
    </main>
  );
} 