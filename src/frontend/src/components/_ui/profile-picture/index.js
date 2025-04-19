"use client";
import { styler, withTypes } from "@/utils/html-class";
import styles from "./profile-picture.module.scss";

const c = styler(styles);

function ProfilePicture({
  className = "",
  type = "",
  imageUrl,
  alt = "Profile picture",
  size = "medium",
  ...props
}) {
  const classTypes = withTypes(type);
  
  return (
    <div 
      className={c("container", ...classTypes, size, className)}
      {...props}
    >
      <img 
        src={imageUrl} 
        alt={alt} 
        className={c("image")}
      />
    </div>
  );
}

export default ProfilePicture; 