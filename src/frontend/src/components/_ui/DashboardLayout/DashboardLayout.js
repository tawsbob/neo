import React from 'react';
import PropTypes from 'prop-types';
import styles from './dashboardLayout.module.scss';

/**
 * Dashboard layout component with sidebar menu and content area
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Content to display in the main area
 * @param {Array} props.menuItems Array of menu items to display in the sidebar
 * @returns {React.ReactElement} Dashboard layout component
 */
const DashboardLayout = ({ children, menuItems = [] }) => {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <a 
                  href={item.path} 
                  className={`${styles.menuLink} ${item.active ? styles.active : ''}`}
                >
                  {item.icon && <span className={styles.menuIcon}>{item.icon}</span>}
                  <span className={styles.menuText}>{item.label}</span>
                </a>
              </li>
            ))}
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