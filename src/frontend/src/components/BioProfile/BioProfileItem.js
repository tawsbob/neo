"use client";
import React from 'react';
import styles from './bioProfile.module.scss';
import Button from '@/components/_ui/button';
import Link from 'next/link';
import { LINKS } from '@/utils/links';
import VerticalGap from '@/components/_ui/VerticalGap';
import ProfilePicture from '../_ui/profile-picture';
import RenderIf from '../_ui/render-if';
import { notEmpty } from '@/utils';
import { styler } from '@/utils/html-class';
import HorizontalGap from '../_ui/HorizontalGap';

const c = styler(styles);

const BioProfileItem = ({ profile }) => {
  const { id, title, url, description, image } = profile;

  const profileUrl = LINKS.BIOPROFILE(url)

  return (
    <div className={styles.profileItem}>
      <VerticalGap type="sm" className={styles.profileContent}>
        <HorizontalGap type="sm" verticalCentered>
          <RenderIf condition={notEmpty(image)}>
            <ProfilePicture imageUrl={image} alt={title} />
          </RenderIf>
          <h4 className={styles.profileTitle}>{title}</h4>
        </HorizontalGap>
        
        {description && <p className={styles.profileDescription}>{description}</p>}
        <p className={c("profileUrl", "primary-text-color", "underline")}>{profileUrl}</p>
      </VerticalGap>
      <div className={styles.profileActions}>
        <VerticalGap type="sm">
          <Link href={`${LINKS.DASHBOARD_BIOPROFILE}/${id}`}>
            <Button type="main inverted fluid small">Edit Profile</Button>
          </Link>
          <Link href={`${LINKS.DASHBOARD_LINKINBIO}?profileId=${id}`}>
            <Button type="gray fluid small">Manage Links</Button>
          </Link>
          <Link href={`${LINKS.BIOPROFILE(url)}`}>
            <Button className="underline" type="fluid small">Check the Profile</Button>
          </Link>
        </VerticalGap>
      </div>
    </div>
  );
};

export default BioProfileItem; 