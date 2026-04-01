// Home em Server Component: os dados sao buscados no servidor antes do HTML ser enviado.
import { DonoRepo } from './components/donorepo/donorepo';
import Link from 'next/link';

// Estrutura de cada repositorio retornado pela API do GitHub.
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

// Estrutura padronizada da resposta usada pela pagina para tratar sucesso e erro.
interface RepoResponse {
  repos: RepoProps[];
  errorMessage: string;
}

// Busca os repositorios no servidor (App Router + Server Component).
async function getData(): Promise<RepoResponse> {
  try {
    // Faz a chamada para a API e cancela a espera caso o servidor demore demais.
    const res = await fetch('https://api.github.com/users/DaniBoy083/repos', {
      signal: AbortSignal.timeout(5000),
    });

    // Interrompe o fluxo quando a API responde com erro HTTP.
    if (!res.ok) {
      throw new Error(`Falha na API do GitHub: ${res.status}`);
    }

    // Converte a resposta em JSON tipado como lista de repositorios.
    const repos = (await res.json()) as RepoProps[];

    // Retorno de sucesso usado pela Home.
    return {
      repos,
      errorMessage: '',
    };
  } catch (error) {
    // Log no servidor para facilitar diagnostico de falhas na busca.
    console.error('Nao foi possivel carregar os repositorios da home.', error);

    // Retorno padrao de erro para a interface conseguir mostrar fallback amigavel.
    return {
      repos: [],
      errorMessage:
        'Nao foi possivel carregar os repositorios agora. Tente novamente em alguns instantes.',
    };
  }
}

// Pagina inicial renderizada no servidor com busca direta da API.
export default async function Home() {
  // Busca os dados no servidor antes de montar o HTML enviado ao navegador.
  const { repos, errorMessage } = await getData();

  // Seleciona o dono do primeiro repositorio para ser enviado ao componente cliente.
  const repoOwner = repos[0]?.owner;

  // Logs apenas para demonstrar a execucao no servidor durante o desenvolvimento.
  console.log('Home component rodou no servidor'); // Log para demonstrar que isso roda no servidor
  console.log('Repositorios carregados no servidor:', repos.length); // Log para mostrar quantos repositorios foram carregados

  return (
    // Container principal da Home.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Titulo principal da rota Home. */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Pagina Home (Server Component)
      </h1>

      {/* Descricao da listagem renderizada no servidor. */}
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Repositorios do GitHub de DaniBoy083 (renderizados no servidor):
      </p>

      {/* Quando a API falha, a pagina mostra um aviso em vez de quebrar a renderizacao. */}
      {errorMessage ? (
        <div className="mt-6 w-full max-w-2xl rounded-lg border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          <p className="font-medium">Falha ao buscar dados da API.</p>
          <p className="mt-1 text-sm">{errorMessage}</p>
        </div>
      ) : repos.length > 0 ? (
        <ul className="mt-2 list-disc text-gray-600 dark:text-gray-400">
          {repos.map((repo: RepoProps) => (
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
      ) : (
        <div className="mt-6 w-full max-w-2xl rounded-lg border border-gray-300 bg-white p-4 text-gray-700 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300">
          Nenhum repositorio foi encontrado para este usuario.
        </div>
      )}

      {/* Esta caixa sinaliza visualmente a fronteira entre Server Component e Client Component. */}
      {repoOwner && (
        <div className="w-full max-w-2xl">
          <div className="mt-8 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            Abaixo, um <strong>Client Component</strong> esta sendo renderizado dentro desta <strong>Home Server Component</strong>.
          </div>

          {/* Componente cliente recebendo props simples vindas do servidor. */}
          <DonoRepo
            owner={{
              login: repoOwner.login,
              avatarUrl: repoOwner.avatar_url,
              profileUrl: repoOwner.html_url,
            }}
          />
        </div>
      )}

      {/* Comparativo solicitado: principais pontos de renderizacao no servidor. */}
      <section className="mt-8 w-full max-w-2xl rounded-lg border border-gray-300/60 p-4 text-gray-700 dark:border-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-semibold">Renderizacao no servidor (Home)</h2>
        <p className="mt-2 font-medium">Vantagens:</p>
        <ul className="list-disc pl-6">
          <li>Melhor SEO, pois o HTML chega pronto para indexacao.</li>
          <li>Menor trabalho inicial no navegador do usuario.</li>
          <li>Dados sensiveis podem ficar no servidor.</li>
        </ul>
        <p className="mt-3 font-medium">Desvantagens:</p>
        <ul className="list-disc pl-6">
          <li>Interatividade com hooks do React nao pode ficar neste arquivo sem use client.</li>
          <li>Cada requisicao pode depender mais do servidor.</li>
          <li>Pode aumentar tempo de resposta se a API for lenta.</li>
        </ul>
      </section>

      {/* Atalhos de navegacao para as demais rotas da aplicacao. */}
      <nav className="mt-8 w-full max-w-2xl">
        <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">Navegar para</h2>
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
          Dashboard e Contatos agora estao organizados no grupo <strong>(site)</strong>, enquanto a nova pagina Admin foi criada no grupo <strong>(admin)</strong>. Esses nomes ajudam a organizar o projeto, mas nao entram na URL.
        </p>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <li>
            <Link
              href="/repositorios"
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
            >
              Repositorios (Client)
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/contatos"
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
            >
              Contatos
            </Link>
          </li>
          <li>
            <Link
              href="/admin"
              className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
            >
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
