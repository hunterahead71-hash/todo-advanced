import React from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { ClipboardList } from 'lucide-react';
import styles from '../../styles/TodoList.module.css';

const TodoList = ({ todos, onToggle, onDelete, onAdd }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ClipboardList size={24} />
        <h2>Activities</h2>
        <span className={styles.count}>{todos.length} tasks</span>
      </div>
      
      <AddTodoForm onAdd={onAdd} />
      
      <div className={styles.list}>
        {todos.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No tasks yet. Add your first task above!</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
