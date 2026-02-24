import React from 'react';
import { Check, Trash2, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import styles from '../../styles/TodoItem.module.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <button
        className={styles.checkbox}
        onClick={() => onToggle(todo.id, todo.completed)}
      >
        {todo.completed && <Check size={16} />}
      </button>
      
      <div className={styles.content}>
        <span className={styles.title}>{todo.title}</span>
        {todo.due_date && (
          <div className={styles.dueDate}>
            <Calendar size={14} />
            <span>{formatDate(todo.due_date)}</span>
          </div>
        )}
      </div>
      
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(todo.id)}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default TodoItem;
