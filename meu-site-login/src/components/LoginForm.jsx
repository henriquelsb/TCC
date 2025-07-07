import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(username, password)) {
      alert('Credenciais inválidas.');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
      <p>
        Não tem uma conta? <a href="/register">Cadastre-se</a>
      </p>
    </form>
  );
};
