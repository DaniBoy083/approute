// Link do Next para navegacao entre as principais areas da aplicacao.
import Link from 'next/link';

// Itens exibidos no menu global do layout raiz.
const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/repositorios', label: 'Repositorios' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/contatos', label: 'Contatos' },
  { href: '/admin', label: 'Admin' },
  { href: '/admin/cliente', label: 'Admin Cliente' },
  { href: '/admin/usuarios/1', label: 'Admin Detalhe' },
];

// Navegacao global usada no layout raiz para destacar os grupos e rotas principais.
export function GlobalNav() {
  return (
    // Faixa superior compartilhada por toda a aplicacao.
    <header className="border-b border-gray-200 bg-white/95 px-4 py-4 backdrop-blur dark:border-gray-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        {/* Linha principal com titulo e resumo da organizacao por route groups. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              App Router Playground
            </p>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Navegacao global entre grupos (site) e (admin)
            </h1>
          </div>

          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            Este menu e global. Ele ajuda a visualizar que algumas rotas pertencem ao grupo <strong>(site)</strong> e outras ao grupo <strong>(admin)</strong>, embora esses nomes nao aparecam na URL.
          </p>
        </div>

        {/* Lista de atalhos para as rotas principais do projeto. */}
        <nav aria-label="Navegacao global da aplicacao">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full items-center justify-center rounded-xl border border-gray-300 bg-zinc-50 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}