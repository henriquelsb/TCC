import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <nav style={{ padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      {!user && (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Cadastrar</Link>
        </>
      )}
      {user && (
        <>
          {isAdmin && <Link to="/admin" style={{ marginRight: '10px' }}>Admin</Link>}
          <button onClick={logout}>Sair</button>
        </>
      )}
    </nav>
  );
};

export default Navigation;