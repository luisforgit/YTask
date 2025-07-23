import { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useTodos from './hooks/useTodos';
import TodoForm      from './TodoForm';
import TodoItem      from './TodoItem';
import TodoFilters   from './TodoFilters';
import TodoEditModal from './TodoEditModal';
import { Typography, Box, Button, CircularProgress, Chip } from '@mui/material';
import { fmt } from '../../utils/date';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function Todos() {
  const { user } = useAuth();
  const { todos, addTodo, updateTodo, removeTodo, orderByField, setOrderByField, orderDir, setOrderDir } = useTodos();
  const [filterText, setFilterText] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterTags, setFilterTags] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // react-router já redirecionará para /login (AppRoutes)
    } catch (err) {
      alert(err.message);
    }
  };

  const visibleTodos = useMemo(() =>
    todos
      .filter(t => !filterText || (t.text ?? '').toLowerCase().includes(filterText.toLowerCase()))
      .filter(t => filterPriority === '' || t.priority >= filterPriority)
      .filter(t => filterTags.length === 0 || filterTags.every(tag => (t.tags ?? []).includes(tag))),
    [todos, filterText, filterPriority, filterTags]
  );

  if (!user) return <CircularProgress />;

  return (
    <Box maxWidth={800} mx="auto" p={2}>

      <Typography variant="h6">Do It! Tarefas para Todos!</Typography> 
      <Typography variant="h6">Welcome, {user.email}</Typography>
      <Button variant="outlined" onClick={handleLogout} sx={{ mb: 2 }}>
        Logout
      </Button>

      <TodoForm onAdd={addTodo} />

      <TodoFilters
        {...{ orderByField, setOrderByField, orderDir, setOrderDir,
              filterText, setFilterText, filterPriority, setFilterPriority, filterTags, setFilterTags }}
      />

      {visibleTodos.map(t => (
        <TodoItem key={t.id} todo={t} onEdit={setEditTodo} onDelete={removeTodo} />
      ))}

      <TodoEditModal
        todo={editTodo}
        open={!!editTodo}
        onClose={() => setEditTodo(null)}
        onSave={data => {
          updateTodo(editTodo.id, data);
          setEditTodo(null);
        }}
      />
    </Box>
  );
}