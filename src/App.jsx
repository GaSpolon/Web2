import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
// Importe outros componentes/páginas, se necessário

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filme/:id" element={<MovieDetails />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sobre" element={<Sobre />} />
        {/* Outras rotas, por exemplo: */}
        {/* <Route path="/contato" element={<Contato />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
