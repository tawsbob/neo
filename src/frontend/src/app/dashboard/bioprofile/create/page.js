"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/_ui/DashboardLayout";
import Button from '@/components/_ui/button';
import Input from '@/components/_ui/input';

import { bioProfileApi } from '@/services/apiService';
import Link from 'next/link';
import { LINKS } from '@/utils/links';
import { useAuth } from '@/context/AuthContext';
import VerticalGap from '@/components/_ui/VerticalGap';
import HorizontalGap from '@/components/_ui/HorizontalGap';
import Card from '@/components/_ui/Card';

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
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
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
                error={errors.title || ''}
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
              />

              <Input
                label="Url name"
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="my-profile"
                error={errors.url || ''}
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
                  {submitting ? 'Creating...' : 'Create Profile'}
                </Button>
                <Link href={LINKS.DASHBOARD_BIOPROFILE}>
                  <Button type="gray small">
                    Cancel
                  </Button>
                </Link>
              </HorizontalGap>
            </form>
          </Card>          
          
        </VerticalGap>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 