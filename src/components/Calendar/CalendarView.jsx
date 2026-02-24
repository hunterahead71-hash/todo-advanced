import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarCell from './CalendarCell';
import { getMonthDays } from '../../utils/dateUtils';
import styles from '../../styles/CalendarView.module.css';

const CalendarView = ({ todos }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthDays = getMonthDays(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getTodosForDate = (date) => {
    if (!date) return [];
    return todos.filter(todo => {
      const todoDate = new Date(todo.created_at).toDateString();
      return todoDate === date.toDateString();
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className={styles.navigation}>
          <button onClick={previousMonth} className={styles.navButton}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMonth} className={styles.navButton}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className={styles.weekDays}>
        {weekDays.map(day => (
          <div key={day} className={styles.weekDay}>{day}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {monthDays.map((date, index) => (
          <CalendarCell
            key={index}
            date={date}
            todos={getTodosForDate(date)}
            isCurrentMonth={date?.getMonth() === currentDate.getMonth()}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
