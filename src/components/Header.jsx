import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Header() {
  const { user, login, logout } = useUser();
  const [username, setUsername] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      setUsername('');
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="bg-zinc-900 p-4 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO + TÍTULO */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:opacity-75 transition-opacity duration-200"
          onClick={() => setMenuOpen(false)}
        >
          <img src="/images/logo_foda.png" alt="Logo do site" className="w-9 h-10" />
          <h1 className="text-2xl font-bold">CINEVIEW</h1>
        </Link>

        {/* BOTÃO HEADER (visível só em telas menores que md) */}
        <button
          className={`md:hidden p-2 rounded transition-colors ${
            menuOpen ? 'bg-yellow-500' : 'bg-zinc-800'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <div className="space-y-1">
            <span className="block w-6 h-[2px] bg-white"></span>
            <span className="block w-6 h-[2px] bg-white"></span>
            <span className="block w-6 h-[2px] bg-white"></span>
          </div>
        </button>


        {/* NAV (Links e Login/Logout) */}
        <nav
          className={`${
            menuOpen ? 'block' : 'hidden'
          } absolute top-[72px] left-0 w-full bg-zinc-900 md:static md:block md:w-auto`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            {/* LINKS */}
            <Link
              to="/sobre"
              className="hover:text-gray-300 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="hover:text-gray-300 transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </Link>

            {/* LOGIN/LOGOUT */}
            {user ? (
              <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-3">
                <span>Bem-vindo, {user}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                >
                  Sair
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleLogin}
                className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2"
              >
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-1 rounded bg-gray-200 text-gray-800"
                />
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                >
                  Entrar
                </button>
              </form>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
