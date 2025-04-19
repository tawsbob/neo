"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/_ui/DashboardLayout";
import Button from '@/components/_ui/button';
import styles from '@/components/BioProfile/bioProfile.module.scss';
import { bioProfileApi } from '@/services/apiService';
import Link from 'next/link';
import { LINKS } from '@/utils/links';
import { useAuth } from '@/context/AuthContext';

export default function CreateBioProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
    try {;
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
      const newProfile = await bioProfileApi.create({
        ...formData,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      router.push(LINKS.DASHBOARD_BIOPROFILE);
    } catch (err) {
      console.error('Error creating bio profile:', err);
      alert('Failed to create bio profile. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div>
          <Link href={LINKS.DASHBOARD_BIOPROFILE} className={styles.backLink}>
            <span className={styles.backIcon}>←</span> Back to Bio Profiles
          </Link>

          <h1>Create New Bio Profile</h1>
          
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
                Url name
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
                {submitting ? 'Creating...' : 'Create Profile'}
              </Button>
              <Link href={LINKS.DASHBOARD_BIOPROFILE}>
                <Button type="button" className={styles.cancelButton}>
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 