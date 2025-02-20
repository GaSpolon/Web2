import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/filmes')
      .then(response => response.json())
      .then(data => setFilmes(data))
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-red-800 min-h-screen flex flex-col">
      <Header />
      <main className="my-8 px-4 max-w-7xl mx-auto flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filmes.map((filme) => (
            <MovieCard
              key={filme.id}
              id={filme.id}
              titulo={filme.titulo}
              poster={filme.poster}
              lancamento={filme.dataLancamento} 
              avaliacao={filme.avaliacao}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
