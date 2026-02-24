import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import styles from '../../styles/CalendarCell.module.css';

const CalendarCell = ({ date, todos, isCurrentMonth }) => {
  if (!date) {
    return <div className={`${styles.cell} ${styles.empty}`} />;
  }

  const completedTodos = todos.filter(t => t.completed);
  const today = new Date().toDateString() === date.toDateString();

  return (
    <div className={`${styles.cell} ${!isCurrentMonth ? styles.otherMonth : ''} ${today ? styles.today : ''}`}>
      <span className={styles.date}>{date.getDate()}</span>
      
      {todos.length > 0 && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <Circle size={12} />
            <span>{todos.length}</span>
          </div>
          {completedTodos.length > 0 && (
            <div className={styles.stat}>
              <CheckCircle size={12} />
              <span>{completedTodos.length}</span>
            </div>
          )}
        </div>
      )}
      
      <div className={styles.progress}>
        {todos.length > 0 && (
          <div 
            className={styles.progressBar}
            style={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
          />
        )}
      </div>
    </div>
  );
};

export default CalendarCell;
