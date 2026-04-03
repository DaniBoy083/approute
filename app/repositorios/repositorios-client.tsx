'use client';

// Hooks usados para estado local e efeitos no navegador.
import { useEffect, useState } from 'react';
// Link do Next para navegacao entre rotas.
import Link from 'next/link';

// Tempo artificial para deixar evidente a diferenca entre busca client-side e server-side.
const SIMULATED_DELAY_MS = 2000;
// Quantidade de placeholders exibidos enquanto a busca esta em andamento.
const loadingPlaceholders = [1, 2, 3, 4];

// Estrutura dos repositorios retornados pela API externa do GitHub.
interface RepoProps {
  id: number;
  name: string;
}

// Componente cliente que busca os repositorios diretamente da API externa do GitHub.
export function RepositoriosClient() {
  // Estado local para guardar dados e status da busca no navegador.
  const [repos, setRepos] = useState<RepoProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Efeito executado uma vez para carregar os dados da API no lado do cliente.
  useEffect(() => {
    // Flag usada para impedir atualizacao de estado apos desmontagem do componente.
    let isCancelled = false;

    // Busca client-side: acontece depois do componente montar no browser.
    async function loadRepos() {
      try {
        // Executa a requisicao direta na API externa e uma espera artificial ao mesmo tempo.
        const [res] = await Promise.all([
          fetch('https://api.github.com/users/DaniBoy083/repos'),
          new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS)),
        ]);

        // Interrompe o fluxo se a API responder com erro HTTP.
        if (!res.ok) {
          throw new Error('Falha ao buscar repositorios na API externa do GitHub.');
        }

        // Converte a resposta em JSON tipado.
        const data = (await res.json()) as RepoProps[];

        // Evita setState caso o componente ja tenha sido desmontado.
        if (isCancelled) {
          return;
        }

        // Guarda os repositorios carregados para renderizacao da lista.
        setRepos(data);
        console.log(
          `Repositorios carregados no cliente apos ${SIMULATED_DELAY_MS}ms:`,
          data.length,
        );
      } catch {
        // Tambem protege o estado em caso de desmontagem durante erro.
        if (isCancelled) {
          return;
        }

        // Mensagem amigavel exibida quando a busca falha.
        setError('Nao foi possivel carregar os repositorios agora.');
      } finally {
        // Finaliza o estado de loading apenas se o componente ainda estiver montado.
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    // Dispara a busca assim que o componente cliente monta.
    loadRepos();
    console.log('useEffect de Repositorios rodou no cliente');

    // Cleanup do efeito para evitar atualizacoes depois da desmontagem.
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Repositorios - GitHub Direto (Client Component)
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Esta versao consulta o GitHub diretamente no navegador.
      </p>

      <p className="mt-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
        Fonte dos dados: API EXTERNA (api.github.com)
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
          href="/repositorios-api"
          className="inline-flex items-center rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          Ver pagina com API INTERNA (/api/repos)
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
