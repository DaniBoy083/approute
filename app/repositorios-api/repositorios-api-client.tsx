'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Delay didatico para destacar estado de carregamento no browser.
const SIMULATED_DELAY_MS = 2000;
// Placeholders do skeleton exibidos durante o loading.
const loadingPlaceholders = [1, 2, 3, 4];

interface RepoProps {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  url: string;
}

interface ReposApiResponse {
  user: string;
  total: number;
  generatedAt: string;
  repos: RepoProps[];
  error?: string;
}

// Componente cliente que busca os repositorios por meio da API interna do projeto.
export function RepositoriosApiClient() {
  // Estados locais para dados, status e mensagens da chamada da API interna.
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [sourceUser, setSourceUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Evita setState apos desmontagem do componente durante requisicao pendente.
    let isCancelled = false;

    // Carrega os repositorios usando a rota interna /api/repos.
    async function loadRepos() {
      try {
        const [res] = await Promise.all([
          fetch('/api/repos?user=DaniBoy083&limit=20'),
          new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS)),
        ]);

        if (!res.ok) {
          const errorPayload = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(errorPayload.error || 'Falha ao buscar repositorios.');
        }

        const data = (await res.json()) as ReposApiResponse;

        if (data.error) {
          throw new Error(data.error);
        }

        if (isCancelled) {
          return;
        }

        setRepos(data.repos);
        setSourceUser(data.user);
      } catch (caughtError) {
        if (isCancelled) {
          return;
        }

        if (caughtError instanceof Error) {
          setError(caughtError.message);
        } else {
          setError('Nao foi possivel carregar os repositorios agora.');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    // Dispara a carga ao montar no cliente.
    loadRepos();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Repositorios - API Interna (Client Component)
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Esta versao consulta a API interna do projeto em /api/repos.
      </p>

      <p className="mt-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
        Fonte dos dados: API INTERNA (/api/repos)
      </p>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Usuario consultado: {sourceUser || 'DaniBoy083'}
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
            <li key={repo.id}>
              <Link
                href={`/repositorios/${repo.id}`}
                className="underline-offset-4 transition hover:text-gray-900 hover:underline dark:hover:text-gray-100"
              >
                {repo.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/repositorios"
          className="inline-flex items-center rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
        >
          Ver pagina com API EXTERNA (GitHub direto)
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
