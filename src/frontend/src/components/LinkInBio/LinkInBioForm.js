"use client";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './linkInBio.module.scss';
import Button from '@/components/_ui/button';
import Card from '../_ui/Card';

const LinkInBioForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    ...initialValues
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        label: initialValues.label || '',
        url: initialValues.url || '',
      });
    }
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.label.trim()) {
      newErrors.label = 'Label is required';
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
      new URL(url);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="label" className={styles.label}>
          Link Label
        </label>
        <input
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          className={styles.input}
          placeholder="e.g. My Portfolio"
        />
        {errors.label && <p className={styles.errorText}>{errors.label}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="url" className={styles.label}>
          URL
        </label>
        <input
          type="text"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          className={styles.input}
          placeholder="https://example.com"
        />
        {errors.url && <p className={styles.errorText}>{errors.url}</p>}
      </div>

      <div className={styles.formActions}>
        <Button type="main small" buttonType="submit" className={styles.submitButton}>
          {initialValues?.id ? 'Update Link' : 'Add Link'}
        </Button>
        {onCancel && (
          <Button 
            type="gray small"
            buttonType="button" 
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
    </Card>
  );
};

LinkInBioForm.propTypes = {
  initialValues: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    url: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default LinkInBioForm; 