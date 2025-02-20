import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

function Login() {
  const { user, login, logout } = useUser();
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      setUsername('');
    }
  };

  return (
    <div className="p-4 bg-zinc-800 text-white rounded mb-4">
      {user ? (
        <div>
          <p>Bem-vindo, {user}!</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mt-2"
          >
            Sair
          </button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded w-full mb-2 text-white bg-zinc-600"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
          >
            Entrar
          </button>
        </form>
      )}
    </div>
  );
}

export default Login;
