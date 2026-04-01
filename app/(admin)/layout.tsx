// Tipos do React para o layout compartilhado do grupo de rotas admin.
import type { ReactNode } from 'react';

// Props do layout do grupo (admin).
interface AdminGroupLayoutProps {
  children: ReactNode;
}

// Layout compartilhado para rotas administrativas organizadas dentro do grupo (admin).
export default function AdminGroupLayout({ children }: AdminGroupLayoutProps) {
  return (
    // Estrutura com destaque visual para a area administrativa.
    <div className="flex flex-1 flex-col">
      {/* Banner didatico sobre o route group (admin). */}
      <div className="border-b border-cyan-200 bg-cyan-50 px-6 py-3 text-sm text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <strong>Grupo de rotas: (admin)</strong>
          <span>
            A pagina /admin esta organizada neste grupo, mas <strong>(admin)</strong> nao aparece na URL.
          </span>
        </div>
      </div>

      {/* Renderiza a pagina filha do grupo administrativo. */}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}