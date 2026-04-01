// Link do Next para navegacao entre rotas sem recarregar a pagina inteira.
import Link from 'next/link';

// Pagina principal da area de dashboard dentro do grupo (site).
export default function Dashboard() {
  return (
    // Estrutura centralizada com chamadas para as rotas filhas do dashboard.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Titulo da rota atual. */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Pagina Dashboard
      </h1>

      {/* Descricao curta da pagina. */}
      <span className="mt-3 text-gray-600 dark:text-gray-400">
        Bem-vindo a pagina de dashboard do nosso aplicativo Next.js.
      </span>

      {/* Bloco visual explicando o grupo (site) e a URL resultante. */}
      <section className="mt-8 w-full max-w-2xl rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        <h2 className="text-lg font-semibold">Explicacao visual do route group</h2>
        <p className="mt-2 text-sm leading-6">
          Este arquivo foi movido para <strong>app/(site)/dashboard/page.tsx</strong>, mas a rota continua sendo <strong>/dashboard</strong>.
          O nome <strong>(site)</strong> organiza o projeto e nao entra no caminho da URL.
        </p>
      </section>

      {/* Grupo de links para navegar entre subrotas e outras areas. */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/dashboard/cadastro"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Cadastro →
        </Link>

        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Configuracoes →
        </Link>

        <Link
          href="/contatos"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Contatos
        </Link>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Admin
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          ← Voltar para Home
        </Link>
      </div>
    </div>
  );
}