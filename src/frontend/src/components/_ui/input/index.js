"use client";
import { useState } from "react";
import { styler, toggle, withTypes } from "@/utils/html-class";
import styles from "./input.module.scss";

const c = styler(styles);

function Input({
  className = "",
  type = "text",
  label = "",
  placeholder = "",
  name = "",
  value = "",
  onChange = () => {},
  error = "",
  inputType = "",
  required = false,
  disabled = false,
  ...props
}) {
  const classTypes = withTypes(inputType);
  const [focused, setFocused] = useState(false);
  
  function handleFocus() {
    setFocused(true);
  }
  
  function handleBlur() {
    setFocused(false);
  }
  
  function handleChange(e) {
    onChange(e);
  }

  const hasValue = value !== "";
  const hasError = error !== "";

  console.log(focused)
  
  return (
    <div className={c(
      "container", 
      ...classTypes, 
      className, 
      toggle(focused, "focused"),
      toggle(hasValue, "has-value"),
      toggle(hasError, "has-error"),
      toggle(disabled, "disabled")
      )}>
      {label && (
        <label className={c("label")} htmlFor={name}>
          {label}
          {required && <span className={c("required")}>*</span>}
        </label>
      )}
      <div className={c("field-container")}>
        <input
          type={type}
          id={name}
          name={name}
          className={c("input")}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          {...props}
        />
      </div>
      {hasError && <div className={c("error")}>{error}</div>}
    </div>
  );
}

export default Input; 