"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/_ui/DashboardLayout";
import BioProfileCard from '@/components/BioProfile/BioProfileCard';
import Button from '@/components/_ui/button';
import styles from '@/components/BioProfile/bioProfile.module.scss';
import { bioProfileApi } from '@/services/apiService';
import Link from 'next/link';
import { LINKS } from '@/utils/links';

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
          <div className={styles.pageHeader}>
            <h1>Bio Profiles</h1>
            <Link href={`${LINKS.DASHBOARD_BIOPROFILE}/create`}>
              <Button type="main">Create New Profile</Button>
            </Link>
          </div>

          {loading && <p>Loading profiles...</p>}
          
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && bioProfiles.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>You don&apos;t have any bio profiles yet.</p>
              <Link href={`${LINKS.DASHBOARD_BIOPROFILE}/create`}>
                <Button className={styles.createButton}>Create Your First Profile</Button>
              </Link>
            </div>
          )}
          
          {!loading && !error && bioProfiles.length > 0 && (
            <div className={styles.profilesContainer}>
              {bioProfiles.map((profile) => (
                <BioProfileCard key={profile.id} bioProfile={profile} />
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 