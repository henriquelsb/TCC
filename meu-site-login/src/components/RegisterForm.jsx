import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return alert('Email inválido');
    if (password !== confirm) return alert('Senhas não coincidem');

    try {
      await register(email, password);
      alert('Usuário registrado!');
    } catch (err) {
      alert('Erro no cadastro: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default RegisterForm;
