"use client";
import React from 'react';
import PropTypes from 'prop-types';
import styles from './bioProfile.module.scss';
import Button from '@/components/_ui/button';
import Link from 'next/link';
import { LINKS } from '@/utils/links';

const BioProfileCard = ({ bioProfile }) => {
  const { id, title, description, url, image } = bioProfile;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {image && (
          <div className={styles.imageContainer}>
            <img src={image} alt={title} className={styles.profileImage} />
          </div>
        )}
        <h3 className={styles.title}>{title}</h3>
      </div>
      {description && <p className={styles.description}>{description}</p>}
      <p className={styles.url}>{url}</p>
      <div className={styles.actions}>
        <Link href={`${LINKS.DASHBOARD_BIOPROFILE}/${id}`}>
          <Button className={styles.editButton}>Edit Profile</Button>
        </Link>
        <Link href={`${LINKS.DASHBOARD_LINKINBIO}?profileId=${id}`}>
          <Button className={styles.linksButton}>Manage Links</Button>
        </Link>
      </div>
    </div>
  );
};

BioProfileCard.propTypes = {
  bioProfile: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default BioProfileCard; 