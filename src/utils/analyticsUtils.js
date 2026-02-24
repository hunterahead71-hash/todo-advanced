export const calculateDailyStats = (todos, date) => {
  const dayTodos = todos.filter(todo => {
    const todoDate = new Date(todo.created_at).toDateString();
    return todoDate === date.toDateString();
  });

  const completedTodos = dayTodos.filter(todo => todo.completed);
  
  return {
    total: dayTodos.length,
    completed: completedTodos.length,
    percentage: dayTodos.length > 0 
      ? (completedTodos.length / dayTodos.length) * 100 
      : 0
  };
};

export const calculateWeeklyStats = (todos) => {
  const weekDays = {};
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toDateString();
    
    weekDays[dateStr] = calculateDailyStats(todos, date);
  }
  
  return weekDays;
};

export const calculateOverallStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  
  return {
    total,
    completed,
    pending: total - completed,
    completionRate: total > 0 ? (completed / total) * 100 : 0
  };
};
