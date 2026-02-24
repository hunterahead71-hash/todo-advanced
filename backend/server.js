import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Get environment variables from Render
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if variables exist
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables!');
  process.exit(1);
}

// Initialize Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// ==================== USER ROUTES ====================

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { name } = req.body;
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ name }])
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== TODO ROUTES ====================

// Get todos for a specific user
app.get('/api/users/:userId/todos', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { user_id, title, due_date } = req.body;
    
    const { data, error } = await supabase
      .from('todos')
      .insert([{
        user_id,
        title,
        due_date: due_date || null,
        completed: false
      }])
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a todo (toggle complete)
app.put('/api/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const { completed } = req.body;
    
    const { data, error } = await supabase
      .from('todos')
      .update({ 
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('id', todoId)
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo
app.delete('/api/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', todoId);
    
    if (error) throw error;
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📝 API endpoints available at http://localhost:${PORT}/api`);
});
