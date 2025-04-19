import React from 'react';
import DashboardLayout from '../_ui/DashboardLayout';

// Example icons - import your own icon component
const HomeIcon = () => <span>🏠</span>;
const SettingsIcon = () => <span>⚙️</span>;
const UsersIcon = () => <span>👥</span>;
const AnalyticsIcon = () => <span>📊</span>;

const DashboardExample = () => {
  // Define your menu items
  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <HomeIcon />,
      active: true
    },
    {
      label: 'Users',
      path: '/dashboard/users',
      icon: <UsersIcon />
    },
    {
      label: 'Analytics',
      path: '/dashboard/analytics',
      icon: <AnalyticsIcon />
    },
    {
      label: 'Settings',
      path: '/dashboard/settings',
      icon: <SettingsIcon />
    }
  ];

  return (
    <DashboardLayout menuItems={menuItems}>
      <div>
        <h1>Dashboard Content</h1>
        <p>This is the main content area of your dashboard. Replace this with your actual content.</p>
        
        {/* Example content */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginTop: '20px'
        }}>
          <h2>Welcome to your Dashboard</h2>
          <p>This is where your application&apos;s main functionality would go.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardExample; 