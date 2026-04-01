// Layout aninhado exclusivo da rota /dashboard dentro do grupo (site).
// Este arquivo afeta a pagina dashboard e suas subrotas sem alterar a URL final.

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Metadados especificos da secao de dashboard.
export const metadata: Metadata = {
  title: 'Dashboard | App Route - Next.js',
  description: 'Painel de controle do aplicativo Next.js com App Router.',
};

// Props esperadas pelo layout da area de dashboard.
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    // Wrapper com header proprio da secao de dashboard.
    <div className="flex flex-1 flex-col">
      {/* Header do dashboard com explicacao sobre a hierarquia de layout. */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
            Dashboard
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 dark:bg-zinc-800 dark:text-gray-400">
            Layout aninhado de /dashboard dentro do grupo (site)
          </span>
        </div>
      </header>

      {/* Conteudo da rota filha ativa do dashboard. */}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}