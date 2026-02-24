import React, { useState } from 'react';
import TodoList from '../components/Todo/TodoList';
import CalendarView from '../components/Calendar/CalendarView';
import DailyAnalytics from '../components/Analytics/DailyAnalytics';
import { useTodos } from '../hooks/useTodos';
import styles from '../styles/Dashboard.module.css';

const Dashboard = ({ currentUser }) => {
  const [view, setView] = useState('grid'); // grid, list, calendar
  const { todos, loading, analytics, addTodo, toggleTodo, deleteTodo } = useTodos(currentUser?.id);

  if (!currentUser) {
    return (
      <div className={styles.welcome}>
        <h2>Welcome to Advanced Todo</h2>
        <p>Please select a user from the sidebar to get started</p>
      </div>
    );
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.mainContent}>
        <div className={styles.todoSection}>
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onAdd={addTodo}
          />
        </div>
        
        <div className={styles.rightPanel}>
          <div className={styles.analyticsSection}>
            <DailyAnalytics analytics={analytics} todos={todos} />
          </div>
          
          <div className={styles.calendarSection}>
            <CalendarView todos={todos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
