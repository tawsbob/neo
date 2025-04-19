"use client";
import { styler } from "@/utils/html-class";
import styles from "./bioprofilecard.module.scss";
import ProfilePicture from "../profile-picture";
import Button from "../button";

const c = styler(styles);

function BioProfileCard({ 
  children, 
  linkInBios = [],
  className = "", 
  title, 
  description, 
  profilePicture
}) {
  return (
    <>
      <div className={c("header")}>
        <ProfilePicture 
          imageUrl={profilePicture} 
          alt={title} 
          size="xl" 
          type="bordered shadow" 
        />
        {title && <h1 className={c("title")}>{title}</h1>}
        {description && <p className={c("subtitle")}>{description}</p>}
      </div>
      <div className={c("container", className)}> 
        <div className={styles.linkList}>
          {
            linkInBios.map((linkInBio) => (
              <div key={linkInBio.id}>
                <Button 
                  type="main fluid" 
                  href={linkInBio.url} 
                  target="_blank">{linkInBio.label}</Button>
              </div>
            ))
          }
        </div>
        {children}
      </div>
    </>
  );
}

export default BioProfileCard; 