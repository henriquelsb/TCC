import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ProfileForm = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [form, setForm] = useState({ nome: '', sobrenome: '', telefone: '', novaSenha: '' });

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm((prev) => ({ ...prev, ...docSnap.data().profile }));
      }
    };
    loadData();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await updateProfile({ nome: form.nome, sobrenome: form.sobrenome, telefone: form.telefone });
    alert('Perfil atualizado!');
  };

  const handlePasswordChange = async () => {
    if (!form.novaSenha || form.novaSenha.length < 6) {
      return alert('A nova senha deve ter no mínimo 6 caracteres.');
    }
    await changePassword(form.novaSenha);
    alert('Senha atualizada!');
    setForm({ ...form, novaSenha: '' });
  };

  return (
    <div>
      <h3>Informações do Perfil</h3>
      <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} /><br />
      <input name="sobrenome" placeholder="Sobrenome" value={form.sobrenome} onChange={handleChange} /><br />
      <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} /><br />
      <button onClick={handleSave}>Salvar Perfil</button>

      <h4>Alterar Senha</h4>
      <input type="password" name="novaSenha" placeholder="Nova senha" value={form.novaSenha} onChange={handleChange} /><br />
      <button onClick={handlePasswordChange}>Atualizar Senha</button>
    </div>
  );
};

export default ProfileForm;