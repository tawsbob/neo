"use client";
import React from 'react';
import styles from './linkInBio.module.scss';
import Button from '@/components/_ui/button';

const LinkInBioItem = ({ link, onEdit, onDelete }) => {
  const { id, label, url } = link;

  return (
    <div className={styles.linkItem}>
      <div className={styles.linkContent}>
        <h4 className={styles.linkLabel}>{label}</h4>
        <p className={styles.linkUrl}>{url}</p>
      </div>
      <div className={styles.linkActions}>
        <Button 
          type="gray small"
          onClick={() => onEdit(link)}
        >
          Edit
        </Button>
        <Button 
          type="red small"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
export default LinkInBioItem; 