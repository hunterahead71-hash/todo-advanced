import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import styles from '../../styles/AddTodoForm.module.css';

const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), dueDate || null);
      setTitle('');
      setDueDate('');
      setShowDatePicker(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className={styles.input}
        />
        
        <button
          type="button"
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={`${styles.dateButton} ${showDatePicker ? styles.active : ''}`}
        >
          <Calendar size={18} />
        </button>
        
        <button type="submit" className={styles.submitButton}>
          <Plus size={20} />
        </button>
      </div>
      
      {showDatePicker && (
        <div className={styles.datePicker}>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.dateInput}
          />
        </div>
      )}
    </form>
  );
};

export default AddTodoForm;
