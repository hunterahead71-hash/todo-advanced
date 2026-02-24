import { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import toast from 'react-hot-toast';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    
    // Load last selected user from localStorage
    const lastUserId = localStorage.getItem('lastUserId');
    if (lastUserId) {
      setCurrentUser({ id: lastUserId });
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await todoService.getUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (name) => {
    try {
      const newUser = await todoService.createUser(name);
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      localStorage.setItem('lastUserId', newUser.id);
      toast.success(`Welcome, ${name}!`);
      return newUser;
    } catch (error) {
      toast.error('Failed to create user');
      console.error(error);
    }
  };

  const selectUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem('lastUserId', user.id);
    toast.success(`Switched to ${user.name}`);
  };

  return {
    users,
    currentUser,
    loading,
    addUser,
    selectUser
  };
};
