// Pagina de configuracoes acessada pela rota /dashboard/settings.
// Mesmo ficando em app/(site)/dashboard/settings/page.tsx, a URL continua /dashboard/settings.

import Link from 'next/link';

export default function Settings() {
  return (
    // Conteudo centralizado, seguindo o padrao visual das demais paginas.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Titulo da pagina. */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Configuracoes
      </h1>

      {/* Descricao da rota e da localizacao dentro do grupo. */}
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Rota /dashboard/settings — utiliza o layout de dashboard e o grupo (site).
      </p>

      {/* Bloco visual explicando o agrupamento interno. */}
      <div className="mt-6 w-full max-w-2xl rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        A pasta <strong>(site)</strong> organiza as rotas do site sem alterar o caminho visto pelo usuario.
      </div>

      {/* Secao de exemplificacao de configuracoes. */}
      <section className="mt-8 w-full max-w-2xl rounded-lg border border-gray-300/60 p-4 text-gray-700 dark:border-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-semibold">Preferencias</h2>

        {/* Lista de itens de configuracao como exemplo. */}
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 dark:bg-zinc-900">
            <span>Notificacoes</span>
            <span className="text-gray-400">Ativadas</span>
          </li>
          <li className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 dark:bg-zinc-900">
            <span>Tema</span>
            <span className="text-gray-400">Sistema</span>
          </li>
          <li className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 dark:bg-zinc-900">
            <span>Idioma</span>
            <span className="text-gray-400">Portugues</span>
          </li>
        </ul>
      </section>

      {/* Acoes de navegacao. */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          ← Voltar para Dashboard
        </Link>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ir para Admin
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