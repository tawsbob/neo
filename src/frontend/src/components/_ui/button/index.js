"use client";
import { styler, withTypes } from "@/utils/html-class";
import styles from "./button.module.scss";

const c = styler(styles);

function Button({
  className = "",
  type = "",
  text = null,
  buttonType = "button",
  href = null,
  onClick = () => {},
  children,
  ...props
}) {
  const classTypes = withTypes(type);

  function _proxyClick(e) {
    if (onClick) {
      onClick(e);
    }

    if (href) {
      window.open(href, "_blank");
    }
  }

  return (
    <button
      type={buttonType}
      className={c("container", ...classTypes, className)}
      onClick={_proxyClick}
      {...props}
    >
      {text || children}
    </button>
  );
}

export default Button;
