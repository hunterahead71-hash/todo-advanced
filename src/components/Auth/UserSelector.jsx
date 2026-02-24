import React, { useState } from 'react';
import { Users, Plus, LogIn } from 'lucide-react';
import AddUserModal from './AddUserModal';
import styles from '../../styles/UserSelector.module.css';

const UserSelector = ({ users, currentUser, onSelectUser, onAddUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Users size={20} />
          <span>Select User</span>
        </div>
        
        <div className={styles.userList}>
          {users.map(user => (
            <button
              key={user.id}
              className={`${styles.userButton} ${
                currentUser?.id === user.id ? styles.active : ''
              }`}
              onClick={() => onSelectUser(user)}
            >
              <div className={styles.userAvatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className={styles.userName}>{user.name}</span>
              {currentUser?.id === user.id && (
                <LogIn size={16} className={styles.activeIcon} />
              )}
            </button>
          ))}
          
          <button
            className={styles.addUserButton}
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add Person</span>
          </button>
        </div>
      </div>

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAddUser}
      />
    </>
  );
};

export default UserSelector;
