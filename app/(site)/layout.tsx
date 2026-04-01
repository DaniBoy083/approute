// Tipos do React para o layout compartilhado do grupo de rotas site.
import type { ReactNode } from 'react';

// Props esperadas pelo layout do grupo (site).
interface SiteGroupLayoutProps {
  children: ReactNode;
}

// Layout compartilhado pelas rotas organizadas dentro do grupo (site).
export default function SiteGroupLayout({ children }: SiteGroupLayoutProps) {
  return (
    // Wrapper que adiciona um aviso visual explicando o route group sem alterar a URL.
    <div className="flex flex-1 flex-col">
      {/* Banner didatico sobre o grupo (site). */}
      <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <strong>Grupo de rotas: (site)</strong>
          <span>
            Dashboard e Contatos estao organizados neste grupo, mas <strong>(site)</strong> nao aparece na URL.
          </span>
        </div>
      </div>

      {/* Renderiza a rota filha ativa, como /dashboard ou /contatos. */}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}