import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const nav = useNavigate();

  const reset = async e => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Reset e-mail sent!');
      nav('/login');
    } catch (err) { alert(err.message); }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>Reset password</Typography>
      <form onSubmit={reset}>
        <TextField label="Email" fullWidth required type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth sx={{mt:2}}>Send reset email</Button>
        <Button onClick={()=>nav('/login')} fullWidth sx={{mt:1}}>Back to login</Button>
      </form>
    </Box>
  );
}