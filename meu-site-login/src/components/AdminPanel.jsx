import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { updateProfile } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(list);
    };
    fetchUsers();
  }, []);

  const handleChange = (id, field, value) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, profile: { ...u.profile, [field]: value } } : u))
    );
  };

  const handleSave = async (user) => {
    await updateProfile(user.profile, user.id);
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <div>
      <h2>Painel de Administração</h2>
      {users.map((user) => (
        <div key={user.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h4>{user.email}</h4>
          <input
            placeholder="Nome"
            value={user.profile?.nome || ''}
            onChange={(e) => handleChange(user.id, 'nome', e.target.value)}
          /><br />
          <input
            placeholder="Sobrenome"
            value={user.profile?.sobrenome || ''}
            onChange={(e) => handleChange(user.id, 'sobrenome', e.target.value)}
          /><br />
          <input
            placeholder="Telefone"
            value={user.profile?.telefone || ''}
            onChange={(e) => handleChange(user.id, 'telefone', e.target.value)}
          /><br />
          <button onClick={() => handleSave(user)}>Salvar Alterações</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
