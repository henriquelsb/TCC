import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Cadastrar</button>
    </form>
  );
};
