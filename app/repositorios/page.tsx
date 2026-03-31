'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SIMULATED_DELAY_MS = 2000;
const loadingPlaceholders = [1, 2, 3, 4];

interface RepoProps {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string;
}

export default function Repositorios() {
  // Estado local para guardar dados e status da busca no navegador.
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    // Busca client-side: acontece depois do componente montar no browser.
    async function loadRepos() {
      try {
        const [res] = await Promise.all([
          fetch('https://api.github.com/users/DaniBoy083/repos'),
          new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS)),
        ]);

        if (!res.ok) {
          throw new Error('Falha ao buscar repositorios.');
        }

        const data = (await res.json()) as RepoProps[];

        if (isCancelled) {
          return;
        }

        setRepos(data);
        console.log(
          `Repositorios carregados no cliente apos ${SIMULATED_DELAY_MS}ms:`,
          data.length,
        );
      } catch {
        if (isCancelled) {
          return;
        }

        setError('Nao foi possivel carregar os repositorios agora.');
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadRepos();
    console.log('useEffect de Repositorios rodou no cliente'); // Log para demonstrar que isso roda no cliente
    console.log(`Simulando espera de ${SIMULATED_DELAY_MS}ms para demonstrar o CSR.`);

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Pagina Repositorios (Client Component)
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Repositorios do GitHub de DaniBoy083 (renderizados no client side):
      </p>

      {loading && (
        <div className="mt-6 w-full max-w-xl space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Simulando a espera da busca client-side antes da renderizacao do conteudo.
          </p>
          {loadingPlaceholders.map((item) => (
            <div
              key={item}
              className="h-12 animate-pulse rounded-lg border border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-zinc-900"
            />
          ))}
        </div>
      )}

      {error && <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>}

      {!loading && !error && (
        <ul className="mt-2 list-disc text-gray-600 dark:text-gray-400">
          {repos.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      )}

      {/* Comparativo solicitado: principais pontos de renderizacao no cliente. */}
      <section className="mt-8 w-full max-w-2xl rounded-lg border border-gray-300/60 p-4 text-gray-700 dark:border-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-semibold">Renderizacao no cliente (Repositorios)</h2>
        <p className="mt-2 font-medium">Vantagens:</p>
        <ul className="list-disc pl-6">
          <li>Alta interatividade com useState, useEffect e eventos.</li>
          <li>Atualizacao dinamica da interface sem recarregar pagina.</li>
          <li>Boa experiencia para dashboards e telas muito interativas.</li>
        </ul>
        <p className="mt-3 font-medium">Desvantagens:</p>
        <ul className="list-disc pl-6">
          <li>SEO pode ser pior se o conteudo depender do JavaScript para aparecer.</li>
          <li>Primeira renderizacao pode mostrar loading ate buscar os dados.</li>
          <li>Mais trabalho no navegador, podendo afetar dispositivos fracos.</li>
        </ul>
      </section>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
      >
        ← Voltar para Home
      </Link>
    </div>
  );
}
