import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export const HomePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo, {user?.username}</h1>
      {user?.isAdmin && <button onClick={() => navigate('/admin')}>Painel Admin</button>}
      <button onClick={logout}>Sair</button>
    </div>
  );
};