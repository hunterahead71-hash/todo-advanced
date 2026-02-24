import React from 'react';
import { X, Home, Calendar, BarChart3, Users } from 'lucide-react';
import UserSelector from '../Auth/UserSelector';
import styles from '../../styles/Sidebar.module.css';

const Sidebar = ({ isOpen, onClose, users, currentUser, onSelectUser, onAddUser }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className={styles.logo}>
          <h2>Todo App</h2>
        </div>
        
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}>
            <Home size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className={styles.navItem}>
            <Calendar size={20} />
            <span>Calendar</span>
          </a>
          <a href="#" className={styles.navItem}>
            <BarChart3 size={20} />
            <span>Analytics</span>
          </a>
          <div className={styles.divider} />
          <div className={styles.navItem}>
            <Users size={20} />
            <span>Users</span>
          </div>
        </nav>
        
        <UserSelector
          users={users}
          currentUser={currentUser}
          onSelectUser={onSelectUser}
          onAddUser={onAddUser}
        />
      </aside>
    </>
  );
};

export default Sidebar;
