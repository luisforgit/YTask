import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { serverTimestamp } from 'firebase/firestore';
import dayjs from 'dayjs';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const submit = e => {
    e.preventDefault();
    if (!text.trim()) return;

    const payload = {
      text,
      tags: tagInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      priority: Number(priority) || 0,
      startDate: startDate ? startDate.format('YYYY-MM-DD') : '',
      deadline: deadline ? deadline.format('YYYY-MM-DD') : '',
      timestamp: serverTimestamp(), // opcional, se quiser
    };

    onAdd(payload);
      setText(''); 
      setTagInput(''); 
      setPriority(''); 
      setStartDate(null); 
      setDeadline(null);

      setText('');
  };

  return (
    <Box component="form" onSubmit={submit} display="flex" flexDirection="column" gap={1} mb={3}>
      <TextField 
        label="Todo text"
        multiline        // permite quebra de linha
        rows={4}         // altura inicial
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />     
      <TextField label="Tags (,)"      value={tagInput} onChange={e=>setTagInput(e.target.value)} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>

      <DatePicker
        label="Start date"
        value={startDate}                       // null | dayjs(...)
        onChange={(newVal) => {
          setStartDate(newVal);                 // keep it as dayjs|null
        }}
      />
          
      <DatePicker
        label="Deadline"
        value={deadline}                       // null | dayjs(...)
        onChange={(d) => setDeadline(d)}      // guarda dayjs|null
      />
      </LocalizationProvider>

      <TextField 
        label="Priority" 
        type="number" 
        value={priority} 
        onChange={e=>setPriority(e.target.value)} />

      <Button 
      type="submit" 
      variant="contained" 
      sx={{width:160}}>Add
      </Button>
    </Box>
  );
}