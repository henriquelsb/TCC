// src/components/ProfileForm.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const ProfileForm = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ nome: '', sobrenome: '', telefone: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const ref = doc(db, 'users', user.uid);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().profile) {
        setProfile(snap.data().profile);
      }
      setLoading(false);
    };
    if (user) loadProfile();
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, { profile });
    alert('Perfil salvo com sucesso!');
  };

  if (loading) return <p>Carregando perfil...</p>;

  return (
    <form onSubmit={handleSave}>
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={profile.nome}
        onChange={handleChange}
      />
      <input
        type="text"
        name="sobrenome"
        placeholder="Sobrenome"
        value={profile.sobrenome}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={profile.telefone}
        onChange={handleChange}
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProfileForm;
