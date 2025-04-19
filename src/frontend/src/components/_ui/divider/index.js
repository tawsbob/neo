"use client";
import { styler, withTypes } from "@/utils/html-class";
import styles from "./divider.module.scss";

const c = styler(styles);

function Divider({
  className = "",
  vertical = false,
  dashed = false,
  margin = "default",
  ...props
}) {
  const classTypes = [];
  
  if (vertical) classTypes.push("vertical");
  if (dashed) classTypes.push("dashed");
  
  const marginClass = {
    none: "no-margin",
    small: "margin-sm",
    default: "",
    large: "margin-lg"
  };
  
  if (marginClass[margin]) {
    classTypes.push(marginClass[margin]);
  }

  return (
    <div
      className={c("divider", ...classTypes, className)}
      role="separator"
      {...props}
    />
  );
}

export default Divider; 