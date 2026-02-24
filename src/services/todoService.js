import { supabase } from './supabase';

export const todoService = {
  // Users
  async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async createUser(name) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ name }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Todos
  async getTodos(userId) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createTodo(userId, title, dueDate = null) {
    const { data, error } = await supabase
      .from('todos')
      .insert([{
        user_id: userId,
        title,
        due_date: dueDate,
        completed: false
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async toggleTodo(todoId, completed) {
    const { data, error } = await supabase
      .from('todos')
      .update({ 
        completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .eq('id', todoId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTodo(todoId) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todoId);
    
    if (error) throw error;
  },

  async updateTodo(todoId, updates) {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', todoId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
