"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/_ui/DashboardLayout";
import LinkInBioItem from '@/components/LinkInBio/LinkInBioItem';
import LinkInBioForm from '@/components/LinkInBio/LinkInBioForm';
import Button from '@/components/_ui/button';
import styles from '@/components/LinkInBio/linkInBio.module.scss';
import { linkInBioApi, bioProfileApi } from '@/services/apiService';
import Link from 'next/link';
import { LINKS } from '@/utils/links';

export default function LinkInBioPage() {
  const searchParams = useSearchParams();
  const profileId = searchParams ? parseInt(searchParams.get('profileId'), 10) : null;
  
  const [bioProfile, setBioProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profileId) {
      fetchBioProfile();
      fetchLinks();
    }
  }, [profileId]);

  const fetchBioProfile = async () => {
    try {
      const data = await bioProfileApi.getById(profileId);
      setBioProfile(data);
    } catch (err) {
      console.error('Error fetching bio profile:', err);
      setError('Failed to load bio profile information');
    }
  };

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const data = await linkInBioApi.getAll(profileId);
      setLinks(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching links:', err);
      setError('Failed to load links. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = () => {
    setEditingLink(null);
    setShowForm(true);
  };

  const handleEditLink = (link) => {
    setEditingLink(link);
    setShowForm(true);
  };

  const handleDeleteLink = async (linkId) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        await linkInBioApi.delete(linkId);
        setLinks(links.filter(link => link.id !== linkId));
      } catch (err) {
        console.error('Error deleting link:', err);
        alert('Failed to delete link. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingLink) {
        // Update existing link
        const updatedLink = await linkInBioApi.update(editingLink.id, formData);
        setLinks(links.map(link => 
          link.id === updatedLink.id ? updatedLink : link
        ));
      } else {
        // Create new link
        const newLink = await linkInBioApi.create({
          ...formData,
          bioProfileId: profileId
        });
        setLinks([...links, newLink]);
      }
      setShowForm(false);
      setEditingLink(null);
    } catch (err) {
      console.error('Error saving link:', err);
      alert('Failed to save link. Please try again.');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingLink(null);
  };

  if (!profileId) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div>
            <h1>Link In Bio</h1>
            <p>No bio profile selected. Please select a profile from the Bio Profiles page.</p>
            <Link href={LINKS.DASHBOARD_BIOPROFILE}>
              <Button>Go to Bio Profiles</Button>
            </Link>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <Link href={LINKS.DASHBOARD_BIOPROFILE} className={styles.backLink}>
            <span className={styles.backIcon}>←</span> Back to Bio Profiles
          </Link>

          <h1>Manage Links</h1>
          
          {bioProfile && (
            <div className={styles.profileInfo}>
              <h2 className={styles.profileTitle}>{bioProfile.title}</h2>
              <p className={styles.profileUrl}>{bioProfile.url}</p>
            </div>
          )}
          
          {showForm && (
            <LinkInBioForm 
              initialValues={editingLink}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          )}
          
          <div className={styles.linksHeader}>
            <h3>Your Links</h3>
            {!showForm && (
              <Button 
                onClick={handleAddLink}
                className={styles.addButton}
              >
                Add New Link
              </Button>
            )}
          </div>

          {loading && <p>Loading links...</p>}
          
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && links.length === 0 && !showForm && (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>You don&apos;t have any links yet.</p>
              <Button 
                onClick={handleAddLink}
                className={styles.addButton}
              >
                Add Your First Link
              </Button>
            </div>
          )}
          
          {!loading && !error && links.length > 0 && (
            <div className={styles.linksContainer}>
              {links.map((link) => (
                <LinkInBioItem 
                  key={link.id}
                  link={link}
                  onEdit={handleEditLink}
                  onDelete={handleDeleteLink}
                />
              ))}
            </div>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 