import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

function MovieCard({ id, titulo, poster, lancamento, avaliacao }) {
  return (
    <Link 
      to={`/filme/${id}`} 
      className="bg-zinc-900 text-white border-zinc-900 rounded-lg p-4 transition-transform duration-300 hover:-translate-y-1"
    >
      <h2 className="text-lg font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
        {titulo}
      </h2>
      <img 
        src={poster} 
        alt={`Poster do filme ${titulo}`} 
        className="w-full max-w-sm mx-auto mb-2 rounded" 
      />
      <p>
        <strong>Data de Lançamento:</strong> {lancamento}
      </p>
      <div className='flex items-center gap-x-1'>
      <p><strong>Avaliação:</strong>{" "}</p>
        <RatingStars rating={avaliacao} />
      </div>
    </Link>
  );
}

export default MovieCard;
