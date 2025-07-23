import { useState, useMemo} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useTodos from './hooks/useTodos';
import TodoForm from './TodoForm';
import TodoFilters from './TodoFilters';
import TodoEditModal from './TodoEditModal';
import {
  Typography,
  Button,
  CircularProgress,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Modal,
  Box,
  Stack,
  TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fmt } from '../../utils/date';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function Todos() {
  const { user } = useAuth();
  const {
    todos,
    addTodo,
    updateTodo,
    removeTodo,
    orderByField,
    setOrderByField,
    orderDir,
    setOrderDir,
  } = useTodos();

  const [filterText, setFilterText] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterTags, setFilterTags] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [detailTodo, setDetailTodo] = useState(null);

  const modalBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,          // mesma largura
    maxHeight: '90vh',   // não ultrapassa a tela
    overflowY: 'auto',   // scroll se ficar muito alto
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      alert(err.message);
    }
  };

  const visibleTodos = useMemo(
    () =>
      todos
        .filter(t => !filterText || (t.text ?? '').toLowerCase().includes(filterText.toLowerCase()))
        .filter(t => filterPriority === '' || t.priority >= filterPriority)
        .filter(t => filterTags.length === 0 || filterTags.every(tag => (t.tags ?? []).includes(tag))),
    [todos, filterText, filterPriority, filterTags]
  );

  if (!user) return <CircularProgress />;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Do It! Tarefas para Todos!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome, {user.email}
        </Typography>

        <Button variant="outlined" color="error" onClick={handleLogout} sx={{ mb: 3 }}>
          Logout
        </Button>

        <TodoForm onAdd={addTodo} />

        <TodoFilters
          {...{
            orderByField,
            setOrderByField,
            orderDir,
            setOrderDir,
            filterText,
            setFilterText,
            filterPriority,
            setFilterPriority,
            filterTags,
            setFilterTags,
          }}
        />

        {/* Cards */}
        <Stack spacing={2} sx={{ mt: 2 }}>
  {visibleTodos.map(todo => (
    <Card key={todo.id}>
      <CardContent>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {todo.text}
        </Typography>

        <Box sx={{ mt: 1 }}>
          {todo.tags?.map(tag => (
            <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5 }} />
          ))}
        </Box>

        <Typography variant="caption" display="block">
          Priority: {todo.priority}
        </Typography>
        <Typography variant="caption" display="block">
          Deadline: {fmt(todo.deadline)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => setDetailTodo(todo)}>Ver</Button>
        <Button size="small" onClick={() => setEditTodo(todo)}>Editar</Button>
        <Button size="small" color="error" onClick={() => removeTodo(todo.id)}>Apagar</Button>
      </CardActions>
    </Card>
  ))}
</Stack>
{/* Modal de edição */}
<TodoEditModal
  todo={editTodo}
  open={!!editTodo}
  onClose={() => setEditTodo(null)}
  onSave={data => {
    updateTodo(editTodo.id, data);
    setEditTodo(null);
  }}
/>

        {/* Modal de detalhes */}
        <Modal
          open={!!detailTodo}
          onClose={() => setDetailTodo(null)}
          aria-labelledby="todo-detail-title"
        >
          <Box sx={modalBoxStyle}>
            <Typography id="todo-detail-title" variant="h6" component="h2" gutterBottom>
              Detalhes da tarefa
            </Typography>

            <Typography variant="body1" paragraph>
              <strong>Texto:</strong><br />
              {detailTodo?.text}
            </Typography>

            <Typography variant="body2">
              <strong>Tags:</strong> {detailTodo?.tags?.join(', ') || '-'}
            </Typography>
            <Typography variant="body2">
              <strong>Prioridade:</strong> {detailTodo?.priority}
            </Typography>
            <Typography variant="body2">
              <strong>Início:</strong> {fmt(detailTodo?.startDate)}
            </Typography>
            <Typography variant="body2">
              <strong>Deadline:</strong> {fmt(detailTodo?.deadline)}
            </Typography>

            <Button
              variant="contained"
              onClick={() => setDetailTodo(null)}
              sx={{ mt: 2 }}
            >
              Fechar
            </Button>
          </Box>
        </Modal>
      </Paper>
    </Container>
  );
}