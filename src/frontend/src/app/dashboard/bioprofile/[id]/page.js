"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/_ui/DashboardLayout";
import Button from '@/components/_ui/button';
import Input from '@/components/_ui/input';
import { bioProfileApi } from '@/services/apiService';
import Link from 'next/link';
import { LINKS } from '@/utils/links';
import Card from '@/components/_ui/Card';
import HorizontalGap from '@/components/_ui/HorizontalGap';
import VerticalGap from '@/components/_ui/VerticalGap';
import Divider from '@/components/_ui/divider';

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

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
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
            <Link href={LINKS.DASHBOARD_BIOPROFILE}>
              <span>←</span> Back to Bio Profiles
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
            <Link href={LINKS.DASHBOARD_BIOPROFILE}>
              <span>←</span> Back to Bio Profiles
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
        <VerticalGap>
          <Link href={LINKS.DASHBOARD_BIOPROFILE}>
            <span>←</span> Back to Bio Profiles
          </Link>
            
          <Card>
            <form onSubmit={handleSubmit}>
              <Input
                label="Profile Title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. My Personal Links"
                error={errors.title}
                required
              />

              <Input
                label="Description (Optional)"
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Short description about this profile"
                rows={3}
                maxLength={500}
              />

              <Input
                label="Profile URL"
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="my-profile"
                error={errors.url}
                required
              />

              <Input
                label="Profile Image URL (Optional)"
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />

              <HorizontalGap type="sm">
                <Button 
                  type="main small" 
                  buttonType="submit" 
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </Button>
                <Link href={LINKS.DASHBOARD_BIOPROFILE}>
                  <Button type="gray small">
                    Cancel
                  </Button>
                </Link>
              </HorizontalGap>
            </form>
          </Card>
          <Divider margin="none" />
          <Card>
            <VerticalGap type="sm"  >
              <h3>Danger Zone</h3>
              <p>Deleting this profile will also delete all associated links.</p>
              <Button type="red small" onClick={handleDelete}>Delete Profile</Button>
            </VerticalGap>
            
          </Card>
          
        </VerticalGap>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 