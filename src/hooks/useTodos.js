import { useState, useEffect, useCallback } from 'react';
import { todoService } from '../services/todoService';
import toast from 'react-hot-toast';

export const useTodos = (userId) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    dailyCompletion: {},
    overallPercentage: 0
  });

  const fetchTodos = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await todoService.getTodos(userId);
      setTodos(data);
      calculateAnalytics(data);
    } catch (error) {
      toast.error('Failed to fetch todos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const calculateAnalytics = (todosData) => {
    const dailyCompletion = {};
    let totalCompleted = 0;

    todosData.forEach(todo => {
      if (todo.completed) {
        totalCompleted++;
        const date = new Date(todo.completed_at || todo.updated_at).toDateString();
        dailyCompletion[date] = (dailyCompletion[date] || 0) + 1;
      }
    });

    const overallPercentage = todosData.length > 0 
      ? (totalCompleted / todosData.length) * 100 
      : 0;

    setAnalytics({
      dailyCompletion,
      overallPercentage: Math.round(overallPercentage * 100) / 100
    });
  };

  const addTodo = async (title, dueDate) => {
    try {
      const newTodo = await todoService.createTodo(userId, title, dueDate);
      setTodos(prev => [newTodo, ...prev]);
      toast.success('Todo added successfully');
      return newTodo;
    } catch (error) {
      toast.error('Failed to add todo');
      console.error(error);
    }
  };

  const toggleTodo = async (todoId, currentStatus) => {
    try {
      const updated = await todoService.toggleTodo(todoId, !currentStatus);
      setTodos(prev => prev.map(todo => 
        todo.id === todoId ? updated : todo
      ));
      toast.success(currentStatus ? 'Todo unmarked' : 'Todo completed!');
    } catch (error) {
      toast.error('Failed to update todo');
      console.error(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await todoService.deleteTodo(todoId);
      setTodos(prev => prev.filter(todo => todo.id !== todoId));
      toast.success('Todo deleted');
    } catch (error) {
      toast.error('Failed to delete todo');
      console.error(error);
    }
  };

  return {
    todos,
    loading,
    analytics,
    addTodo,
    toggleTodo,
    deleteTodo,
    refreshTodos: fetchTodos
  };
};
