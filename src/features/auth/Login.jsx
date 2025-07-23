import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const login = async e => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav('/');
    } catch (err) { alert(err.message); }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>Login</Typography>
      <form onSubmit={login}>
        <TextField label="Email"    fullWidth required type="email"    value={email}    onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" fullWidth required type="password" value={password} onChange={e=>setPassword(e.target.value)} sx={{mt:2}} />
        <Button type="submit" variant="contained" fullWidth sx={{mt:2}}>Login</Button>
        <Button onClick={()=>nav('/register')} fullWidth sx={{mt:1}}>Register</Button>
        <Button onClick={()=>nav('/reset')}    fullWidth sx={{mt:1}}>Forgot password?</Button>
      </form>
    </Box>
  );
}