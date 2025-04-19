"use client";
import { useState } from "react";
import { styler } from "@/utils/html-class";
import Button from "@/components/_ui/button";
import Input from "@/components/_ui/input";
import styles from "./loginform.module.scss";

const c = styler(styles);

function LoginForm({ onSuccess = () => {}, className = "" }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  }
  
  function validateForm() {
    const newErrors = {};
    let isValid = true;
    
    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onSuccess();
      }, 1000);
    }
  }

  return (
    <div className={c("container", className)}>
      <div className={c("header")}>
        <h1 className={c("title")}>Welcome Back</h1>
        <p className={c("subtitle")}>Sign in to your account</p>
      </div>
      
      <form className={c("form")} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <div className={c("forgot-password")}>
          <a href="#" className={c("link")}>Forgot password?</a>
        </div>
        
        <Button 
          type="main fluid"
          buttonType="submit"
          disabled={isLoading}
          className={c("submit-button")}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className={c("footer")}>
        <p>Don't have an account? <a href="#" className={c("link")}>Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginForm; 