import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Carrega o usuário do localStorage assim que o contexto for montado
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Função de login que salva no estado e no localStorage
  const login = (username) => {
    setUser(username);
    localStorage.setItem('loggedUser', username);
  };

  // Função de logout que limpa o estado e remove do localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedUser');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
