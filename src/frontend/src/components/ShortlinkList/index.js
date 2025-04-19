"use client";

import { useState } from 'react';
import styles from './shortlinklist.module.scss';

export default function ShortlinkList({ shortlinks = [], onRefresh }) {
  const [copiedId, setCopiedId] = useState(null);
  
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001';
  
  const copyToClipboard = async (shortId) => {
    const shortUrl = `${baseUrl}/${shortId}`;
    
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(shortId);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!shortlinks.length) {
    return (
      <div className={styles.emptyState}>
        <p>You haven't created any shortlinks yet.</p>
        {onRefresh && (
          <button onClick={onRefresh} className={styles.refreshButton}>
            Refresh
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Shortlinks</h2>
        {onRefresh && (
          <button onClick={onRefresh} className={styles.refreshButton}>
            Refresh
          </button>
        )}
      </div>
      
      <div className={styles.list}>
        {shortlinks.map((link) => (
          <div key={link.id} className={styles.item}>
            <div className={styles.shortUrlContainer}>
              <span className={styles.shortUrl}>
                {baseUrl}/{link.shortId}
              </span>
              <button 
                className={styles.copyButton}
                onClick={() => copyToClipboard(link.shortId)}
              >
                {copiedId === link.shortId ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            <div className={styles.details}>
              <span className={styles.originalUrl} title={link.url}>
                {link.url.length > 60 ? link.url.substring(0, 60) + '...' : link.url}
              </span>
              <span className={styles.metadata}>
                Created: {formatDate(link.createdAt)}
                {link.preserveParams && (
                  <span className={styles.badge}>Parameters preserved</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 