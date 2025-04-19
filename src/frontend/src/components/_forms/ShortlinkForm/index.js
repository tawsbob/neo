"use client";

import { useState } from 'react';
import { ShortlinkService } from '@/services/shortlink.service';
import styles from './shortlinkform.module.scss';
import FormCard from '@/components/_ui/FormCard';

const INITIAL_FORM_STATE = {
  url: '',
  preserveParams: false
};

export default function ShortlinkForm({ onSuccess }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.url) {
      setError('URL is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const result = await ShortlinkService.createShortlink(formData);
      
      setSuccess('Shortlink created successfully!');
      resetForm();
      
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to create shortlink');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard 
      className={styles.formContainer}
      title="Create New Shortlink"
    >
      
        <h2 className={styles.formTitle}></h2>
        
      {error && (
        <div className={styles.errorMessage}>{error}</div>
      )}
      
      {success && (
        <div className={styles.successMessage}>{success}</div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="url">URL to Shorten</label>
          <input
            id="url"
            type="url"
            name="url"
            placeholder="https://example.com/long-url-to-shorten"
            value={formData.url}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <div className={styles.checkboxGroup}>
            <input
              id="preserveParams"
              type="checkbox"
              name="preserveParams"
              checked={formData.preserveParams}
              onChange={handleChange}
              className={styles.checkbox}
            />
            <label htmlFor="preserveParams">Preserve URL Parameters</label>
          </div>
          <p className={styles.helpText}>
            If enabled, any parameters added to your short URL will be passed to the destination URL.
          </p>
        </div>
        
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Shortlink'}
        </button>
      </form>
    </FormCard>
  );
} 