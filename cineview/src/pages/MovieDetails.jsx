import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RatingStars from '../components/RatingStars';
import Login from '../components/Login';
import { useUser } from '../contexts/UserContext';

function MovieDetails() {
  const { id } = useParams();
  const { user } = useUser(); // Usuário logado
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);

  // Controla a exibição do formulário de adicionar comentário
  const [showAddForm, setShowAddForm] = useState(false);

  // Carrega dados do filme (incluindo reviews) do JSON Server
  useEffect(() => {
    fetch(`http://localhost:3001/filmes/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Filme não encontrado');
        }
        return response.json();
      })
      .then(data => {
        setMovie(data);
        setReviews(data.reviews || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar filme:', error);
        setLoading(false);
      });
  }, [id]);

  // Atualiza o back-end (JSON Server) com os reviews
  const updateReviewsInBackend = (updatedReviews) => {
    fetch(`http://localhost:3001/filmes/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reviews: updatedReviews })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao atualizar reviews');
        }
        return response.json();
      })
      .then(data => {
        setMovie(data);
        setReviews(data.reviews || []);
      })
      .catch(error => console.error('Erro ao atualizar no back-end:', error));
  };

  // Verifica se o usuário logado já comentou neste filme
  const hasCommented = user && reviews.some(r => r.autor === user);

  // Adiciona um novo comentário
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user || !novoComentario.trim()) return;

    // Se, por alguma razão, chegar aqui sem checar hasCommented (segurança extra)
    if (hasCommented) {
      alert('Você já comentou neste filme.');
      return;
    }

    const novoReview = {
      id: reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
      autor: user,
      comentario: novoComentario.trim()
    };

    const updatedReviews = [...reviews, novoReview];
    updateReviewsInBackend(updatedReviews);
    setNovoComentario('');
    setShowAddForm(false);  // Fecha o formulário após adicionar
  };

  // Deleta um comentário
  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter(r => r.id !== reviewId);
    updateReviewsInBackend(updatedReviews);
  };

  // Inicia a edição de um comentário
  const handleEditReview = (review) => {
    setEditingReview(review);
    setNovoComentario(review.comentario);
    setShowAddForm(false);
  };

  // Atualiza um comentário editado
  const handleUpdateReview = (e) => {
    e.preventDefault();
    if (!editingReview || !novoComentario.trim()) return;
    const updatedReviews = reviews.map(r => {
      if (r.id === editingReview.id) {
        return { ...r, comentario: novoComentario.trim() };
      }
      return r;
    });
    updateReviewsInBackend(updatedReviews);
    setEditingReview(null);
    setNovoComentario('');
  };

  // Cancela a edição
  const handleCancelEdit = () => {
    setEditingReview(null);
    setNovoComentario('');
  };

  // Cancela a adição
  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNovoComentario('');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-red-800">
        <Header />
        <main className="flex-grow text-white text-center p-4">
          <h2>Carregando...</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-red-800">
        <Header />
        <main className="flex-grow text-white text-center p-4">
          <h2>Filme não encontrado</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-red-800">
      <Header />
      <main className="flex-grow my-8 px-4 max-w-7xl mx-auto">
        <section className="flex flex-col lg:flex-row gap-4">
          {/* Card com poster e detalhes */}
          <div className="bg-zinc-900 text-white rounded-lg p-4 h-fit mx-auto sm:max-w-[350px]">
            <img
              src={movie.poster}
              alt={`Pôster do filme ${movie.titulo}`}
              className="w-full h-full mb-2 rounded"
            />
            <p className="font-semibold text-center">{movie.dataLancamento}</p>
            <div className="flex justify-center">
              <RatingStars rating={movie.avaliacao} />
            </div>
          </div>

          {/* Seção de conteúdo: sinopse, avaliação e comentários */}
          <section className="flex flex-col flex-grow">
            <div className="bg-zinc-900 text-white border-zinc-900 rounded-lg p-4">
              <h2 className="text-2xl font-bold text-yellow-400">{movie.titulo}</h2>
              <div className="movie-summary mt-4">
                <h3 className="text-lg font-semibold mb-2">Sinopse</h3>
                <p>{movie.sinopse}</p>
              </div>
              <div className="mt-4">
                <strong>Avaliação:</strong>
                <RatingStars rating={movie.avaliacao} />
              </div>
            </div>

            <div className="bg-zinc-900 text-white border-zinc-900 rounded-lg p-4 mt-5">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Comentários e Resenhas</h3>

              {reviews.map(review => (
                <div key={review.id} className="bg-zinc-800 border-zinc-900 rounded-lg p-4 my-2">
                  <p className="font-semibold">{review.autor}</p>
                  <p>{review.comentario}</p>
                  {/* Só exibe botões se o comentário for do usuário logado */}
                  {user === review.autor && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleEditReview(review)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Deletar
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Se o usuário estiver logado */}
              {user ? (
                <>
                  {/* Se o usuário já comentou, mostra apenas mensagem */}
                  {hasCommented && !editingReview ? (
                    <p className="text-yellow-400">
                      Você já comentou neste filme.
                    </p>
                  ) : (
                    <>
                      {/* Se estivermos editando um review, mostra o formulário de edição */}
                      {editingReview && (
                        <form onSubmit={handleUpdateReview} className="mt-4">
                          <label className="block mb-2 font-semibold">Editando comentário:</label>
                          <textarea
                            value={novoComentario}
                            onChange={(e) => setNovoComentario(e.target.value)}
                            className="p-2 rounded w-full mb-2 text-white bg-zinc-600"
                            rows="3"
                          />
                          <div className="flex space-x-2">
                            <button
                              type="submit"
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                            >
                              Atualizar
                            </button>
                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            >
                              Cancelar
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Se não estamos editando e o usuário ainda não comentou, exibe botão ou form de adicionar */}
                      {!editingReview && !hasCommented && (
                        <>
                          {!showAddForm ? (
                            <button
                              onClick={() => setShowAddForm(true)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                            >
                              Adicionar Comentário
                            </button>
                          ) : (
                            <form onSubmit={handleAddComment} className="mt-4">
                              <label className="block mb-2 font-semibold">Novo comentário:</label>
                              <textarea
                                placeholder="Seu comentário"
                                value={novoComentario}
                                onChange={(e) => setNovoComentario(e.target.value)}
                                className="p-2 rounded w-full mb-2 text-white bg-zinc-600"
                                rows="3"
                              />
                              <div className="flex space-x-2">
                                <button
                                  type="submit"
                                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                >
                                  Enviar
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelAdd}
                                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </form>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <p className="mt-4 text-yellow-400">
                  Faça login para adicionar um comentário.
                </p>
              )}
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default MovieDetails;
