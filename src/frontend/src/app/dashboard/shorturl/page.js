"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ShortlinkForm from '@/components/_forms/ShortlinkForm';
import ShortlinkList from '@/components/ShortlinkList';
import { ShortlinkService } from '@/services/shortlink.service';
import styles from './shorturl.module.scss';
import DashboardLayout from '@/components/_ui/DashboardLayout';
import { LINKS } from '@/utils/links';

const menuItems = [
  {
    label: 'Dashboard',
    path: LINKS.DASHBOARD,
    icon: null,
    active: true
  },
  {
    label: 'Shortlinks',
    path: LINKS.DASHBOARD_SHORTURL,
    icon: null,
    active: false
  },
  // More menu items...
];

export default function ShortUrlPage() {
  const { user } = useAuth();
  const [shortlinks, setShortlinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchShortlinks = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await ShortlinkService.getUserShortlinks();
      setShortlinks(data || []);
    } catch (err) {
      console.error('Failed to fetch shortlinks:', err);
      setError('Failed to load your shortlinks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchShortlinks();
    }
  }, [user]);

  const handleShortlinkCreated = (newShortlink) => {
    setShortlinks((prevShortlinks) => [newShortlink, ...prevShortlinks]);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout menuItems={menuItems}>
      <div className={styles.container}>
        {/* <div className={styles.header}>
          <h1 className={styles.title}>URL Shortener</h1>
          <p className={styles.description}>
            Create and manage your shortened URLs
          </p>
        </div> */}

        <div className={styles.content}>
          <section className={styles.formSection}>
            <ShortlinkForm onSuccess={handleShortlinkCreated} />
          </section>

          <section className={styles.listSection}>
            {loading ? (
              <div className={styles.loadingState}>Loading your shortlinks...</div>
            ) : error ? (
              <div className={styles.errorState}>{error}</div>
            ) : (
              <ShortlinkList 
                shortlinks={shortlinks} 
                onRefresh={fetchShortlinks} 
              />
            )}
          </section>
        </div>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 