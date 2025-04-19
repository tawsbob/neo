"use client";
import { styler } from "@/utils/html-class";
import styles from "./card.module.scss";

const c = styler(styles);

function Card({ children }) {
  return (
    <div className={c("container")}>
      { children }
    </div>
  );
}

export default Card;
