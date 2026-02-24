import React from 'react';
import { Menu, User } from 'lucide-react';
import styles from '../../styles/Header.module.css';

const Header = ({ currentUser, onMenuClick }) => {
  return (
    <header className={styles.header}>
      <button onClick={onMenuClick} className={styles.menuButton}>
        <Menu size={24} />
      </button>
      
      <h1>Advanced Todo</h1>
      
      {currentUser && (
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <span className={styles.userName}>{currentUser.name}</span>
        </div>
      )}
    </header>
  );
};

export default Header;
