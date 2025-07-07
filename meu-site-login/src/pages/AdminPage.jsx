import { useAuth } from '../context/AuthContext';

export const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Painel do Administrador</h1>
      <p>Bem-vindo, {user.username}</p>
      {/* Aqui você pode adicionar mais funcionalidades exclusivas do admin */}
    </div>
  );
};