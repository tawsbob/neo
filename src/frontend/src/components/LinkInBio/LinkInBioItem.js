"use client";
import React from 'react';
import PropTypes from 'prop-types';
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
          className={styles.editButton} 
          onClick={() => onEdit(link)}
        >
          Edit
        </Button>
        <Button 
          className={styles.deleteButton} 
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

LinkInBioItem.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default LinkInBioItem; 