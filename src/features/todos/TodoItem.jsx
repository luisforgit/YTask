import { Chip, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fmt } from '../../utils/date';

export default function TodoItem({ todo, onEdit, onDelete }) {
  const tags = todo.tags ?? [];
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} p={1} border={1} borderRadius={1} borderColor="divider">
      <Box>
        <Typography>{todo.text}</Typography>
        <Box>{tags.map(tag => <Chip key={tag} label={tag} size="small" sx={{mr:0.5}}/>)}</Box>
        <Typography variant="caption">Priority: {todo.priority}</Typography>
        {todo.startDate && <Typography variant="caption"> Start: {fmt(todo.startDate)}</Typography>}
        {todo.deadline && <Typography variant="caption"> Deadline: {fmt(todo.deadline)}</Typography>}
      </Box>
      <Box>
        <IconButton onClick={()=>onEdit(todo)}><EditIcon/></IconButton>
        <IconButton onClick={()=>onDelete(todo.id)}><DeleteIcon/></IconButton>
      </Box>
    </Box>
  );
}