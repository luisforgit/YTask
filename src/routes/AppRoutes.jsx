import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Login    from '../features/auth/Login';
import Register from '../features/auth/Register';
import Reset    from '../features/auth/ResetPassword';
import Todos    from '../features/todos/Todos';

export default function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <p style={{textAlign:'center', marginTop:'3rem'}}>loading…</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={!user ? <Login />    : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/reset"    element={!user ? <Reset />    : <Navigate to="/" />} />
        <Route path="/"         element={ user ? <Todos />    : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}