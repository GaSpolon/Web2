// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Header() {
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
    <header className="bg-zinc-900 p-4 flex items-center justify-between text-white">
      <Link to="/" className="flex items-center space-x-3 hover:opacity-75 transition-opacity duration-200">
        <img src="/images/logo_foda.png" alt="Logo do site" className="w-9 h-10" />
        <h1 className="text-2xl font-bold">CINEVIEW</h1>
      </Link>

      <nav className="font-semibold flex items-center space-x-6">
        <Link to="/sobre" className="hover:text-gray-300 transition-colors duration-200">
          Sobre
        </Link>
        <Link to="/contato" className="hover:text-gray-300 transition-colors duration-200">
          Contato
        </Link>

        {/* Se o usuário estiver logado, exibe o nome e o botão de sair */}
        {user ? (
          <div className="flex items-center space-x-3">
            <span>Bem-vindo, {user}!</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
            >
              Sair
            </button>
          </div>
        ) : (
          /* Se não estiver logado, mostra o formulário de login */
          <form onSubmit={handleLogin} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Seu nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-1 rounded text-white bg-zinc-600"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
            >
              Entrar
            </button>
          </form>
        )}
      </nav>
    </header>
  );
}

export default Header;
