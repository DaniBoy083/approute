'use client';

import { useState } from 'react';

// Aviso global para deixar explicito o objetivo educacional da aplicacao.
export function AcademicNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label="Aviso academico"
      className="border-b border-amber-200 bg-amber-50/90 px-4 py-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
    >
      <div className="mx-auto flex w-full max-w-6xl items-start gap-3">
        <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-amber-400 bg-amber-100 text-xs font-bold text-amber-700 dark:border-amber-700 dark:bg-amber-900/60 dark:text-amber-200">
          i
        </span>

        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Uso academico</p>
          <p className="mt-1 text-sm leading-6">
            Esta aplicacao foi criada meramente para fins academicos, com foco em estudos de Next.js App Router,
            organizacao de rotas e padroes de renderizacao.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="inline-flex h-8 items-center justify-center rounded-md border border-amber-300 px-3 text-xs font-semibold uppercase tracking-wide transition hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900/50"
          aria-label="Fechar aviso academico"
        >
          Fechar
        </button>
      </div>
    </section>
  );
}
