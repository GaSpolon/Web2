import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contato() {
return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-red-800">
        <Header />
        {/* Conteúdo Principal */}
        <main className="flex-grow">
                <div className="min-h-full flex items-center justify-center p-4">
                    {/* Card */}
                    <div className="bg-zinc-900 text-white rounded-lg p-4 text-base sm:text-xl shadow-xl space-y-4 w-full max-w-md mx-auto">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400 text-center">
                            Contato
                        </h2>
                        <p className="mb-8">
                            Entre em contato conosco por meio dos seguintes e-mails:
                        </p>
                        <div className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors">
                            <p className="text-yellow-500">Contato 1:</p>
                            <a href="mailto:gspolon@estudante.ufscar.br">
                                gspolon@estudante.ufscar.br
                            </a>
                        </div>

                        <div className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors">
                            <p className="text-yellow-500">Contato 1:</p>
                            <a href="mailto:andre.rettondini@estudante.ufscar.br">
                                andre.rettondini@estudante.ufscar.br
                            </a>
                        </div>
                    </div>
                </div>
        </main>
        <Footer />
    </div>
);
}

export default Contato;
