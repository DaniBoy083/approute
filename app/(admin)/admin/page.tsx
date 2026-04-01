// Link do Next para navegacao entre areas da aplicacao.
import Link from 'next/link';

// Pagina administrativa acessivel pela rota /admin.
export default function AdminPage() {
  return (
    // Container da pagina administrativa.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Titulo da area administrativa. */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Pagina Admin
      </h1>

      {/* Resumo do objetivo desta pagina. */}
      <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
        Esta rota demonstra um segundo grupo de rotas separado do grupo (site) e funciona como hub da area administrativa.
      </p>

      {/* Explicacao visual sobre a localizacao do arquivo e a URL real. */}
      <section className="mt-8 w-full max-w-2xl rounded-2xl border border-cyan-300 bg-cyan-50 p-5 text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-200">
        <h2 className="text-lg font-semibold">Explicacao visual do route group</h2>
        <p className="mt-2 text-sm leading-6">
          Esta pagina esta em <strong>app/(admin)/admin/page.tsx</strong>, mas o usuario acessa somente <strong>/admin</strong>.
          O grupo <strong>(admin)</strong> organiza as rotas administrativas sem entrar na URL.
        </p>
      </section>

      {/* Cards simples de exemplo para a area administrativa. */}
      <div className="mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-zinc-900">
          <span className="block text-xs uppercase tracking-wide text-gray-500">Escopo</span>
          <strong className="mt-2 block text-lg text-gray-900 dark:text-gray-100">Admin</strong>
        </div>
        <div className="rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-zinc-900">
          <span className="block text-xs uppercase tracking-wide text-gray-500">URL final</span>
          <strong className="mt-2 block text-lg text-gray-900 dark:text-gray-100">/admin</strong>
        </div>
        <div className="rounded-xl border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-zinc-900">
          <span className="block text-xs uppercase tracking-wide text-gray-500">Pasta real</span>
          <strong className="mt-2 block text-lg text-gray-900 dark:text-gray-100">(admin)</strong>
        </div>
      </div>

      {/* Painel com atalhos para as novas rotas administrativas sugeridas e implementadas. */}
      <section className="mt-8 w-full max-w-3xl rounded-2xl border border-cyan-300 bg-cyan-50 p-5 text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-200">
        <h2 className="text-lg font-semibold">Expansoes adicionadas na area admin</h2>
        <p className="mt-2 text-sm leading-6">
          Esta area agora possui uma pagina cliente em <strong>/admin/cliente</strong>, uma rota dinamica server-side em <strong>/admin/usuarios/[id]</strong> e um loading especifico do segmento <strong>/admin</strong>.
        </p>
      </section>

      {/* Navegacao para outras rotas. */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/admin/cliente"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ir para Admin Cliente
        </Link>
        <Link
          href="/admin/usuarios/1"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ver detalhe dinamico
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ir para Dashboard
        </Link>
        <Link
          href="/contatos"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ir para Contatos
        </Link>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          ← Voltar para Home
        </Link>
      </div>
    </div>
  );
}