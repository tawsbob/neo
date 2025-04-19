"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/_ui/DashboardLayout";
import Button from '@/components/_ui/button';
import styles from './page.module.scss';
import { bioProfileApi } from '@/services/apiService';
import Link from 'next/link';
import { LINKS } from '@/utils/links';
import HorizontalGap from '@/components/_ui/HorizontalGap';
import Card from '@/components/_ui/Card';
import VerticalGap from '@/components/_ui/VerticalGap';
import BioProfileItem from '@/components/BioProfile/BioProfileItem';

export default function BioProfilesPage() {
  const [bioProfiles, setBioProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBioProfiles();
  }, []);

  const fetchBioProfiles = async () => {
    try {
      setLoading(true);
      const { data } = await bioProfileApi.getAll();
      setBioProfiles(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bio profiles:', err);
      setError('Failed to load bio profiles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <div className={styles.profilesHeader}>
            <h2>Your Bio Profiles</h2>
            <Link href={LINKS.DASHBOARD_BIOPROFILE_CREATE}>
              <Button type="main small">Create New Profile</Button>
            </Link>
          </div>

          {loading && <p>Loading profiles...</p>}
          
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && bioProfiles.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>You don&apos;t have any bio profiles yet.</p>
              <Link href={`${LINKS.DASHBOARD_BIOPROFILE_CREATE}`}>
                <Button className={styles.createButton}>Create Your First Profile</Button>
              </Link>
            </div>
          )}
          
         {!loading && !error && bioProfiles.length > 0 && (
            <VerticalGap type="sm">
              {bioProfiles.map((profile) => (
                <BioProfileItem key={profile.id} profile={profile} />
              ))}
            </VerticalGap>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 