import { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fmt } from '../../utils/date';

export default function TodoEditModal({ todo, open, onClose, onSave }) {
  const [text, setText] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [deadline, setDeadline] = useState(null);

  // preenche os campos quando o modal abre
  useEffect(() => {
    if (!todo) return;
    setText(todo.text ?? '');
    setTagInput(todo.tags?.join(', ') ?? '');
    setPriority(todo.priority?.toString() ?? '');
    setStartDate(todo.startDate ? dayjs(todo.startDate) : null);
    setDeadline(todo.deadline ? dayjs(todo.deadline) : null);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      text,
      tags: tagInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      priority: Number(priority) || 0,
      startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
      deadline: deadline ? deadline.format('YYYY-MM-DD') : '',
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Editar Tarefa
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Texto"
            multiline
            rows={4}
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Tags (vírgula)"
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Início"
              value={startDate}
              onChange={(d) => setStartDate(d)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
            />
            <DatePicker
              label="Deadline"
              value={deadline}
              onChange={(d) => setDeadline(d)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
            />
          </LocalizationProvider>
          <TextField
            label="Prioridade"
            type="number"
            fullWidth
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Guardar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}