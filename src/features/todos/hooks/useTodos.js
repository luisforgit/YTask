import { useEffect, useState, useMemo } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../contexts/AuthContext';

export default function useTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [orderByField, setOrderByField] = useState('deadline');
  const [orderDir, setOrderDir] = useState('desc');



  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, `users/${user.uid}/todos`), orderBy(orderByField, orderDir));
    return onSnapshot(q, snap =>
      setTodos(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, [user, orderByField, orderDir]);

  const addTodo    = data => addDoc(collection(db, `users/${user.uid}/todos`), { ...data, timestamp: serverTimestamp() });
  const updateTodo = (id, data) => updateDoc(doc(db, `users/${user.uid}/todos`, id), data);
  const removeTodo = id => deleteDoc(doc(db, `users/${user.uid}/todos`, id));

  
  const allTags = useMemo(() => {
    const set = new Set();
    todos.forEach((t) => t.tags?.forEach(set.add, set));
    return [...set];
  }, [todos]);
  
  return { todos, allTags, addTodo, updateTodo, removeTodo, orderByField, setOrderByField, orderDir, setOrderDir };
}