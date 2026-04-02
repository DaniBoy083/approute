'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void; // Funcao fornecida pelo Next.js para tentar renderizar a rota novamente.
}

export default function Error({ error, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error('Erro capturado pela error boundary da rota raiz.', error);
  }, [error]);

  return (
    <div className="relative flex min-h-[70vh] flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.14),transparent_35%),radial-gradient(circle_at_bottom,rgba(251,146,60,0.12),transparent_30%)] bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(113,113,122,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.08)_1px,transparent_1px)] bg-size-[42px_42px] opacity-40" />

      <section className="relative z-10 w-full max-w-2xl rounded-3xl border border-gray-300/60 bg-white/90 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.08)] dark:border-gray-700 dark:bg-zinc-900/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <span className="inline-flex rounded-full border border-orange-300 bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
          Runtime Error
        </span>

        <h1 className="mt-5 text-5xl font-black tracking-tight text-gray-950 dark:text-gray-50 sm:text-6xl">
          Ocorreu um erro inesperado
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">
          Algo falhou durante a renderizacao desta rota. Tente novamente ou volte para uma area segura da aplicacao.
        </p>

        {error.digest && (
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left text-sm text-gray-700 dark:border-gray-800 dark:bg-zinc-950 dark:text-gray-300">
            <p className="text-xs uppercase tracking-wide text-gray-500">Error Digest</p>
            <p className="mt-2 break-all font-mono">{error.digest}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            Tentar novamente
          </button>

          <Link
            href="/"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
          >
            Voltar para Home
          </Link>
        </div>
      </section>
    </div>
  );
}