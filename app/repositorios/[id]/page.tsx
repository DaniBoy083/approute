// Metadata e tipagem do App Router para a pagina dinamica de detalhe.
import type { Metadata } from 'next';
import { CacheObserver } from '@/app/components/cache-observer/cache-observer';
import { CACHE_REVALIDATE_SECONDS, CACHE_TAGS } from '@/app/lib/cache-config';
// Link do Next para navegacao entre as rotas da aplicacao.
import Link from 'next/link';
// notFound encerra a renderizacao atual e delega para o not-found mais proximo do segmento.
import { notFound } from 'next/navigation';

// Estrutura simplificada da resposta de detalhe de repositorio retornada pela API do GitHub.
interface RepoDetail {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  visibility: string;
  owner: {
    login: string;
  };
}

// Estrutura da requisicao HTTP adicional usada para simular um segundo exemplo server-side.
interface ExampleHttpResponse {
  id: number;
  title: string;
  completed: boolean;
}

// Props da rota dinamica no formato esperado pelo Next 16.
interface RepoDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Busca o detalhe do repositorio usando o id informado na URL.
async function getRepositoryById(id: string): Promise<RepoDetail> {
  const repositoryId = Number(id);

  // IDs invalidos nao devem tentar bater na API externa.
  if (!Number.isInteger(repositoryId) || repositoryId <= 0) {
    notFound();
  }

  const response = await fetch(`https://api.github.com/repositories/${repositoryId}`, {
    next: {
      revalidate: CACHE_REVALIDATE_SECONDS.repoDetail,
      tags: [CACHE_TAGS.githubRepoDetail],
    },
  });

  // Quando a API nao encontra o repositorio, renderizamos a pagina customizada de 404.
  if (response.status === 404) {
    notFound();
  }

  // Demais erros de infraestrutura continuam como falha real da requisicao.
  if (!response.ok) {
    throw new Error(`Falha ao carregar o repositorio ${id}. Status: ${response.status}`);
  }

  return (await response.json()) as RepoDetail;
}

// Requisicao extra apenas para demonstrar uma segunda chamada HTTP no server-side.
async function getExampleHttpData(id: string): Promise<ExampleHttpResponse> {
  const simulatedId = (Number(id) % 10) + 1;
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${simulatedId}`, {
    next: {
      revalidate: CACHE_REVALIDATE_SECONDS.exampleHttp,
      tags: [CACHE_TAGS.exampleHttp],
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao carregar a requisicao de exemplo. Status: ${response.status}`);
  }

  return (await response.json()) as ExampleHttpResponse;
}

// Metadata dinamica para refletir o id acessado antes da renderizacao final da pagina.
export async function generateMetadata({ params }: RepoDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Repositorio ${id} | App Route - Next.js`,
    description: 'Detalhe dinamico de repositorio renderizado no servidor.',
  };
}

// Pagina server-side para detalhes de um repositorio acessado via /repositorios/[id].
export default async function RepositorioDetalhe({ params }: RepoDetailPageProps) {
  const { id } = await params;
  const generatedAtIso = new Date().toISOString();

  // As duas requisicoes HTTP acontecem no servidor antes do HTML ser enviado ao navegador.
  const [repo, exampleHttpData] = await Promise.all([
    getRepositoryById(id),
    getExampleHttpData(id),
  ]);

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <div className="w-full max-w-4xl space-y-8">
        {/* Cabecalho da pagina destacando o uso de rota dinamica server-side. */}
        <header className="rounded-2xl border border-gray-300/60 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            Server Component dinamico
          </span>

          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            {repo.full_name}
          </h1>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Esta pagina foi acessada pelo parametro <strong>id</strong> da URL e renderizada no servidor.
          </p>

          <div className="mt-6 grid gap-4 text-sm text-gray-700 dark:text-gray-300 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-zinc-950">
              <span className="block text-xs uppercase tracking-wide text-gray-500">ID</span>
              <strong className="mt-1 block text-lg text-gray-900 dark:text-gray-100">{repo.id}</strong>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-zinc-950">
              <span className="block text-xs uppercase tracking-wide text-gray-500">Linguagem</span>
              <strong className="mt-1 block text-lg text-gray-900 dark:text-gray-100">{repo.language ?? 'Nao informada'}</strong>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-zinc-950">
              <span className="block text-xs uppercase tracking-wide text-gray-500">Stars</span>
              <strong className="mt-1 block text-lg text-gray-900 dark:text-gray-100">{repo.stargazers_count}</strong>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-zinc-950">
              <span className="block text-xs uppercase tracking-wide text-gray-500">Visibilidade</span>
              <strong className="mt-1 block text-lg text-gray-900 dark:text-gray-100">{repo.visibility}</strong>
            </div>
          </div>
        </header>

        {/* Secao principal com o detalhe do repositorio real retornado pela API do GitHub. */}
        <section className="rounded-2xl border border-gray-300/60 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Detalhes do repositorio
          </h2>

          <dl className="mt-5 grid gap-4 text-sm text-gray-700 dark:text-gray-300 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Nome</dt>
              <dd className="mt-2 font-medium text-gray-900 dark:text-gray-100">{repo.name}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Dono</dt>
              <dd className="mt-2 font-medium text-gray-900 dark:text-gray-100">{repo.owner.login}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Forks</dt>
              <dd className="mt-2 font-medium text-gray-900 dark:text-gray-100">{repo.forks_count}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Issues abertas</dt>
              <dd className="mt-2 font-medium text-gray-900 dark:text-gray-100">{repo.open_issues_count}</dd>
            </div>
          </dl>

          <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-700 dark:bg-zinc-950 dark:text-gray-300">
            {repo.description ?? 'Este repositorio nao possui descricao publica cadastrada.'}
          </p>

          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            Abrir repositorio no GitHub
          </a>
        </section>

        {/* Secao extra para demonstrar uma segunda requisicao HTTP server-side. */}
        <section className="rounded-2xl border border-blue-300/70 bg-blue-50 p-6 shadow-sm dark:border-blue-900 dark:bg-blue-950/30">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200">
            Exemplo de requisicao HTTP adicional
          </h2>

          <p className="mt-3 text-sm text-blue-900/80 dark:text-blue-200/80">
            Alem da consulta do repositorio no GitHub, esta pagina fez uma segunda requisicao HTTP no servidor para simular uma integracao externa.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-white/70 p-4 dark:border-blue-900 dark:bg-zinc-900/70">
              <span className="block text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300">Exemplo ID</span>
              <strong className="mt-2 block text-lg text-blue-950 dark:text-blue-100">{exampleHttpData.id}</strong>
            </div>
            <div className="rounded-xl border border-blue-200 bg-white/70 p-4 dark:border-blue-900 dark:bg-zinc-900/70 sm:col-span-2">
              <span className="block text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300">Titulo retornado</span>
              <strong className="mt-2 block text-lg text-blue-950 dark:text-blue-100">{exampleHttpData.title}</strong>
            </div>
          </div>

          <p className="mt-4 text-sm text-blue-900/80 dark:text-blue-200/80">
            Status simulado: {exampleHttpData.completed ? 'concluido' : 'pendente'}.
          </p>
        </section>

        <CacheObserver
          title="Observabilidade de Cache - Detalhe de Repositorio"
          generatedAtIso={generatedAtIso}
          revalidateInSeconds={CACHE_REVALIDATE_SECONDS.repoDetail}
          tags={[CACHE_TAGS.githubRepoDetail, CACHE_TAGS.exampleHttp]}
          scope="repo-detail"
        />

        {/* Navegacao para retornar a listagem ou para a home. */}
        <nav className="flex flex-wrap gap-3">
          <Link
            href="/repositorios"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
          >
            ← Voltar para Repositorios
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
          >
            ← Voltar para Home
          </Link>
        </nav>
      </div>
    </div>
  );
}