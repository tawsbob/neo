"use client";
import { useState } from "react";
import { styler } from "@/utils/html-class";
import Button from "@/components/_ui/button";
import Input from "@/components/_ui/input";
import FormCard from "@/components/_ui/FormCard";
import { useAuth } from "@/context/AuthContext";
import { LINKS } from "@/utils/links";
import styles from "./loginform.module.scss";

const c = styler(styles);

function LoginForm({ onSuccess = () => {}, className = "" }) {
  const { login, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: ""
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
    
    // Clear form error when any field changes
    if (errors.form) {
      setErrors({
        ...errors,
        form: ""
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
    
    setErrors({ ...errors, ...newErrors });
    return isValid;
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const result = await login(formData.email, formData.password);
        console.log(result);
        if (result.success) {
          onSuccess(result.user);
        } else {
          setErrors({
            ...errors,
            form: result.error || "Login failed. Please check your credentials."
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors({
          ...errors,
          form: "An unexpected error occurred. Please try again."
        });
      } finally {
        setIsLoading(false);
      }
    }
  }

  const footerContent = (
    <p>Don't have an account? <a href={LINKS.REGISTER} className={c("link")}>Sign up</a></p>
  );

  return (
    <FormCard 
      className={className}
      title="Welcome Back"
      subtitle="Sign in to your account"
      footer={footerContent}
    >
      <form className={c("form")} onSubmit={handleSubmit}>
        {errors.form && (
          <div className={c("form-error")}>
            {errors.form}
          </div>
        )}
        
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
          disabled={isLoading || authLoading}
          className={c("submit-button")}
        >
          {isLoading || authLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </FormCard>
  );
}

export default LoginForm; 