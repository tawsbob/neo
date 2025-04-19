"use client";
import { useState } from "react";
import { styler } from "@/utils/html-class";
import Button from "@/components/_ui/button";
import Input from "@/components/_ui/input";
import FormCard from "@/components/_ui/FormCard";
import { useAuth } from "@/context/AuthContext";
import { LINKS } from "@/utils/links";
import { useRouter } from "next/navigation";
import styles from "./registerform.module.scss";

const c = styler(styles);

function RegisterForm({ onSuccess = () => {}, className = "" }) {
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: ""
  });
  
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
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
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "First name is required";
      isValid = false;
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    
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
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setErrors({ ...errors, ...newErrors });
    return isValid;
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Create registration data object, excluding confirmPassword
      const registrationData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        lastName: formData.lastName
      };
      
      try {
        const result = await register(registrationData);
        if (result.success) {
          onSuccess(result.user);
        } else {
          setErrors({
            ...errors,
            form: result.error || "Registration failed. Please try again."
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
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
    <p>Already have an account? <a href={LINKS.LOGIN} className={c("link")}>Sign in</a></p>
  );

  return (
    <FormCard
      className={className}
      title="Create an Account"
      subtitle="Fill in your details to get started"
      footer={footerContent}
    >
      <form className={c("form")} onSubmit={handleSubmit}>
        {errors.form && (
          <div className={c("form-error")}>
            {errors.form}
          </div>
        )}
        
        <div className={c("name-container")}>
          <Input
            label="First Name"
            type="text"
            name="name"
            placeholder="Your first name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Your last name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>
        
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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        
        <Button 
          type="main fluid"
          buttonType="submit"
          disabled={isLoading || authLoading}
          className={c("submit-button")}
        >
          {isLoading || authLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </FormCard>
  );
}

export default RegisterForm; 