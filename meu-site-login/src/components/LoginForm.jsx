import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação simples do email
    if (!email || !email.includes('@')) {
      alert('Por favor, digite um email válido.');
      return;
    }

    if (!password) {
      alert('Por favor, digite a senha.');
      return;
    }

    try {
      await login(email, password);
      alert('Login realizado com sucesso!');
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
}
