import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

let users = JSON.parse(localStorage.getItem('users'));
if (!users) {
  users = [
    { username: 'admin', password: 'admin123', isAdmin: true }
  ];
  localStorage.setItem('users', JSON.stringify(users));
}

