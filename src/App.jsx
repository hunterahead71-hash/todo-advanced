import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import { useUsers } from './hooks/useUsers';
import './styles/global.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { users, currentUser, loading, addUser, selectUser } = useUsers();

  return (
    <div className="app">
      <Toaster position="top-right" />
      
      <Header 
        currentUser={currentUser}
        onMenuClick={() => setSidebarOpen(true)}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        users={users}
        currentUser={currentUser}
        onSelectUser={selectUser}
        onAddUser={addUser}
      />
      
      <main className="main-content">
        <Dashboard currentUser={currentUser} />
      </main>
    </div>
  );
}

export default App;
