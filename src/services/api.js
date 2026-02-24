// This will be your backend URL on Render
const API_URL = 'https://todo-advanced-8o4c.onrender.com'; // We'll change this later

export const api = {
  // Users
  async getUsers() {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async createUser(name) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  // Todos
  async getTodos(userId) {
    const response = await fetch(`${API_URL}/users/${userId}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  async createTodo(userId, title, dueDate) {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        user_id: userId, 
        title, 
        due_date: dueDate 
      })
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  async toggleTodo(todoId, completed) {
    const response = await fetch(`${API_URL}/todos/${todoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },

  async deleteTodo(todoId) {
    const response = await fetch(`${API_URL}/todos/${todoId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.json();
  },

  async getUserStats(userId) {
    const response = await fetch(`${API_URL}/users/${userId}/stats`);
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  }
};
