import { api } from './api';

export const todoService = {
  async getUsers() {
    return api.getUsers();
  },

  async createUser(name) {
    return api.createUser(name);
  },

  async getTodos(userId) {
    return api.getTodos(userId);
  },

  async createTodo(userId, title, dueDate) {
    return api.createTodo(userId, title, dueDate);
  },

  async toggleTodo(todoId, completed) {
    return api.toggleTodo(todoId, completed);
  },

  async deleteTodo(todoId) {
    return api.deleteTodo(todoId);
  },

  async getUserStats(userId) {
    return api.getUserStats(userId);
  }
};
