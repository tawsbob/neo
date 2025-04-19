"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/_ui/DashboardLayout";
import Button from '@/components/_ui/button';
import styles from '@/components/BioProfile/bioProfile.module.scss';
import { bioProfileApi } from '@/services/apiService';
import Link from 'next/link';
import { LINKS } from '@/utils/links';

export default function EditBioProfilePage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const profileId = parseInt(id, 10);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBioProfile();
  }, []);
  //}, [profileId]);

  const fetchBioProfile = async () => {
    try {
      setLoading(true);
      const {data} = await bioProfileApi.getById(profileId);
      setFormData({
        title: data.title || '',
        description: data.description || '',
        url: data.url || '',
        image: data.image || ''
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching bio profile:', err);
      setError('Failed to load bio profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSubmitting(true);
      await bioProfileApi.update(profileId, formData);
      router.push(LINKS.DASHBOARD_BIOPROFILE);
    } catch (err) {
      console.error('Error updating bio profile:', err);
      alert('Failed to update bio profile. Please try again.');
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this profile? This will also delete all associated links.')) {
      try {
        await bioProfileApi.delete(profileId);
        router.push(LINKS.DASHBOARD_BIOPROFILE);
      } catch (err) {
        console.error('Error deleting bio profile:', err);
        alert('Failed to delete bio profile. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div>
            <Link href={LINKS.DASHBOARD_BIOPROFILE} className={styles.backLink}>
              <span className={styles.backIcon}>←</span> Back to Bio Profiles
            </Link>
            <h1>Edit Bio Profile</h1>
            <p>Loading profile...</p>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div>
            <Link href={LINKS.DASHBOARD_BIOPROFILE} className={styles.backLink}>
              <span className={styles.backIcon}>←</span> Back to Bio Profiles
            </Link>
            <h1>Edit Bio Profile</h1>
            <p className="error">{error}</p>
            <Button onClick={() => fetchBioProfile()}>Try Again</Button>
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

          <div className={styles.pageHeader}>
            <h1>Edit Bio Profile</h1>
            <Button 
              type="deleteButton" 
              className={styles.deleteButton} 
              onClick={handleDelete}
            >
              Delete Profile
            </Button>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>
                Profile Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g. My Personal Links"
              />
              {errors.title && <p className={styles.errorText}>{errors.title}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Short description about this profile"
                rows={3}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="url" className={styles.label}>
                Profile URL
              </label>
              <input
                type="text"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className={styles.input}
                placeholder="my-profile"
              />
              {errors.url && <p className={styles.errorText}>{errors.url}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.label}>
                Profile Image URL (Optional)
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className={styles.formActions}>
              <Button 
                type="main" 
                buttonType="submit" 
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Link href={LINKS.DASHBOARD_BIOPROFILE}>
                <Button type="button" className={styles.cancelButton}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
          
          <Link href={`${LINKS.DASHBOARD_LINKINBIO}?profileId=${profileId}`}>
            <Button type="main" className={styles.manageLinksButton}>
              Manage Links
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 