import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Sobre() {
return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-red-800">
        <Header />
        {/* Conteúdo Principal */}
        <main class="flex-grow">
            <div class="min-h-full flex items-center justify-center p-4">
                {/* Card */}
                <div class="bg-zinc-900 rounded-lg p-4 text-white text-xl space-y-4">
                    <h2 class="text-3xl font-bold mb-6 text-yellow-400 text-center">Sobre</h2>
                    <p>
                        Este site de resenhas de filmes foi desenvolvido para a disciplina de Desenvolvimento de Software Web 2 (DSW2), na UFSCar.
                    </p>
                    <p>
                        Nosso objetivo é oferecer uma plataforma simples e acessível para compartilhar e consultar opiniões sobre filmes.
                    </p>
                </div>
            </div>            
        </main>
        <Footer />
    </div>
);
}

export default Sobre;
