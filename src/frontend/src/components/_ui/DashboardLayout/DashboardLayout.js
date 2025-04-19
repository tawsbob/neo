import React from 'react';
import PropTypes from 'prop-types';
import styles from './dashboardLayout.module.scss';
import { LINKS } from '@/utils/links';
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext';
import Button from '../button';

/**
 * Dashboard layout component with sidebar menu and content area
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Content to display in the main area
 * @returns {React.ReactElement} Dashboard layout component
 */
const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Dashboard',
      path: LINKS.DASHBOARD,
      icon: null,
    },
    {
      label: 'Shortlinks',
      path: LINKS.DASHBOARD_SHORTURL,
      icon: null,
    },
  ]

  const handleLogout = async () => {
    await logout();
    // No need to redirect - the ProtectedRoute will handle that
  };
  
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => {
              const isActive = pathname === item.path
              return (
                <li key={index} className={styles.menuItem}>
                  <a 
                    href={item.path} 
                    className={`${styles.menuLink} ${isActive ? styles.active : ''}`}
                  >
                    {item.icon && <span className={styles.menuIcon}>{item.icon}</span>}
                    <span className={styles.menuText}>{item.label}</span>
                  </a>
                </li>
              )
            })}
            <li className={styles.menuItem}>
              <Button onClick={handleLogout} className={styles.menuLink}>
                <span className={styles.menuIcon}>👋</span>
                <span className={styles.menuText}>Logout</span>
              </Button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.node,
      active: PropTypes.bool
    })
  )
};

export default DashboardLayout; 