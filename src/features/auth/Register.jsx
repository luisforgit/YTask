import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const register = async e => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      nav('/');
    } catch (err) { alert(err.message); }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>Register</Typography>
      <form onSubmit={register}>
        <TextField label="Email"    fullWidth required type="email"    value={email}    onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" fullWidth required type="password" value={password} onChange={e=>setPassword(e.target.value)} sx={{mt:2}} />
        <Button type="submit" variant="contained" fullWidth sx={{mt:2}}>Create account</Button>
        <Button onClick={()=>nav('/login')} fullWidth sx={{mt:1}}>Back to login</Button>
      </form>
    </Box>
  );
}