"use client";
import { styler } from "@/utils/html-class";
import styles from "./formcard.module.scss";

const c = styler(styles);

function FormCard({ 
  children, 
  className = "", 
  title, 
  subtitle, 
  footer 
}) {
  return (
    <div className={c("container", className)}>
      {(title || subtitle) && (
        <div className={c("header")}>
          {title && <h1 className={c("title")}>{title}</h1>}
          {subtitle && <p className={c("subtitle")}>{subtitle}</p>}
        </div>
      )}
      
      {children}
      
      {footer && (
        <div className={c("footer")}>
          {footer}
        </div>
      )}
    </div>
  );
}

export default FormCard; 