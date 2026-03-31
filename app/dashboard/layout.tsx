// Layout aninhado exclusivo da rota /dashboard.
// Este arquivo so afeta a pagina de dashboard e seus filhos,
// sem interferir no layout raiz (app/layout.tsx).
// O App Router aplica layouts de forma hierarquica: o layout raiz sempre
// envolve este, que por sua vez envolve o page.tsx do dashboard.

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Metadados especificos da secao de dashboard.
// Sobrescrevem apenas os campos declarados aqui; os demais herdam do layout raiz.
export const metadata: Metadata = {
  title: 'Dashboard | App Route - Next.js',
  description: 'Painel de controle do aplicativo Next.js com App Router.',
};

// Props esperadas pelo layout: children representa o conteudo da pagina filha
// (neste caso, app/dashboard/page.tsx).
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    // Wrapper que organiza header + conteudo em coluna ocupando a altura disponivel.
    <div className="flex flex-1 flex-col">

      {/* Header de exemplificacao exclusivo da area de dashboard.
          Demonstra como cada secao pode ter seu proprio cabecalho
          sem alterar o layout das outras rotas. */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-zinc-950">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">

          {/* Titulo da area */}
          <span className="text-sm font-semibold tracking-wide text-gray-800 dark:text-gray-200">
            Dashboard
          </span>

          {/* Badge de exemplificacao indicando que este header pertence ao layout aninhado */}
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 dark:bg-zinc-800 dark:text-gray-400">
            Layout aninhado — exclusivo da rota /dashboard
          </span>

        </div>
      </header>

      {/* Conteudo da pagina filha renderizado aqui.
          O children e injetado automaticamente pelo App Router com o conteudo
          de app/dashboard/page.tsx (ou de rotas filhas mais profundas, se existirem). */}
      <div className="flex flex-1 flex-col">
        {children}
      </div>

    </div>
  );
}
