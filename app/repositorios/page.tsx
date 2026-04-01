'use client';

// Hooks usados para estado local e efeitos no navegador.
import { useEffect, useState } from 'react';
// Link do Next para navegacao entre rotas.
import Link from 'next/link';

// Tempo artificial para deixar evidente a diferenca entre busca client-side e server-side.
const SIMULATED_DELAY_MS = 2000;
// Quantidade de placeholders exibidos enquanto a busca esta em andamento.
const loadingPlaceholders = [1, 2, 3, 4];

// Estrutura dos repositorios retornados pela API do GitHub.
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

// Pagina cliente que busca os repositorios apenas depois da hidratacao no navegador.
export default function Repositorios() {
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
        // Executa a requisicao da API e uma espera artificial ao mesmo tempo.
        const [res] = await Promise.all([
          fetch('https://api.github.com/users/DaniBoy083/repos'),
          new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS)),
        ]);

        // Interrompe o fluxo se a API responder com erro HTTP.
        if (!res.ok) {
          throw new Error('Falha ao buscar repositorios.');
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
    console.log('useEffect de Repositorios rodou no cliente'); // Log para demonstrar que isso roda no cliente
    console.log(`Simulando espera de ${SIMULATED_DELAY_MS}ms para demonstrar o CSR.`);

    // Cleanup do efeito para evitar atualizacoes depois da desmontagem.
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    // Container principal da pagina de repositorios no cliente.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Titulo destacando que esta rota e um Client Component. */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Pagina Repositorios (Client Component)
      </h1>

      {/* Explicacao curta do comportamento client-side da pagina. */}
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Repositorios do GitHub de DaniBoy083 (renderizados no client side):
      </p>

      {/* Estado visual de carregamento antes da resposta da API chegar. */}
      {loading && (
        <div className="mt-6 w-full max-w-xl space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Simulando a espera da busca client-side antes da renderizacao do conteudo.
          </p>
          {/* Skeletons simples para representar a lista enquanto os dados nao chegam. */}
          {loadingPlaceholders.map((item) => (
            <div
              key={item}
              className="h-12 animate-pulse rounded-lg border border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-zinc-900"
            />
          ))}
        </div>
      )}

      {/* Mensagem de erro exibida quando a busca falha. */}
      {error && <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>}

      {/* Lista exibida apenas quando o loading acabou e nao houve erro. */}
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

      {/* Link de retorno para a rota inicial. */}
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
      >
        ← Voltar para Home
      </Link>
    </div>
  );
}
