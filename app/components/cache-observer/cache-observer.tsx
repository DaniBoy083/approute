'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { CacheRevalidateScope } from '@/app/lib/cache-config';
import {
  CACHE_LAST_REVALIDATED_AT_KEY,
  CACHE_REVALIDATED_EVENT,
} from '@/app/lib/cache-telemetry';

interface CacheObserverProps {
  title: string;
  generatedAtIso: string;
  revalidateInSeconds: number;
  tags: string[];
  scope: CacheRevalidateScope;
}

// Painel client-side para visualizar metadata de cache e disparar revalidacao manual.
export function CacheObserver({
  title,
  generatedAtIso,
  revalidateInSeconds,
  tags,
  scope,
}: CacheObserverProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState('');
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generatedAtMs = useMemo(() => new Date(generatedAtIso).getTime(), [generatedAtIso]);
  const expiresAtMs = generatedAtMs + revalidateInSeconds * 1000;
  const remainingSeconds = Math.max(0, Math.floor((expiresAtMs - nowMs) / 1000));

  function formatDate(isoDate: string) {
    return new Date(isoDate).toLocaleString('pt-BR');
  }

  function handleManualRevalidate() {
    startTransition(async () => {
      try {
        const response = await fetch('/api/cache/revalidate', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ scope }),
        });

        if (!response.ok) {
          throw new Error('Falha ao solicitar revalidacao manual.');
        }

        const payload = (await response.json()) as {
          message: string;
          revalidatedAt: string;
        };

        // Salva o horario no browser para mostrar no badge global entre paginas.
        window.localStorage.setItem(CACHE_LAST_REVALIDATED_AT_KEY, payload.revalidatedAt);
        window.dispatchEvent(
          new CustomEvent(CACHE_REVALIDATED_EVENT, {
            detail: { revalidatedAt: payload.revalidatedAt },
          }),
        );

        setFeedback(`${payload.message} (${formatDate(payload.revalidatedAt)})`);
        router.refresh();
      } catch {
        setFeedback('Nao foi possivel solicitar revalidacao manual agora.');
      }
    });
  }

  return (
    <section className="mt-8 w-full max-w-2xl rounded-lg border border-violet-300/70 bg-violet-50/70 p-4 text-sm text-violet-950 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-100">
      <h2 className="text-lg font-semibold">{title}</h2>

      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-violet-200 bg-white/80 p-3 dark:border-violet-900 dark:bg-zinc-900/70">
          <dt className="text-xs uppercase tracking-wide text-violet-700 dark:text-violet-300">Gerado no servidor</dt>
          <dd className="mt-1 font-medium">{formatDate(generatedAtIso)}</dd>
        </div>

        <div className="rounded-lg border border-violet-200 bg-white/80 p-3 dark:border-violet-900 dark:bg-zinc-900/70">
          <dt className="text-xs uppercase tracking-wide text-violet-700 dark:text-violet-300">Revalidate (s)</dt>
          <dd className="mt-1 font-medium">{revalidateInSeconds}</dd>
        </div>

        <div className="rounded-lg border border-violet-200 bg-white/80 p-3 dark:border-violet-900 dark:bg-zinc-900/70 sm:col-span-2">
          <dt className="text-xs uppercase tracking-wide text-violet-700 dark:text-violet-300">Tempo para revalidar</dt>
          <dd className="mt-1 font-medium">
            {remainingSeconds > 0
              ? `${remainingSeconds}s restantes para a janela atual de cache`
              : 'Janela expirada. A proxima visita pode gerar novo fetch.'}
          </dd>
        </div>

        <div className="rounded-lg border border-violet-200 bg-white/80 p-3 dark:border-violet-900 dark:bg-zinc-900/70 sm:col-span-2">
          <dt className="text-xs uppercase tracking-wide text-violet-700 dark:text-violet-300">Tags de cache</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-full border border-violet-300 bg-violet-100 px-2 py-1 text-xs font-semibold dark:border-violet-700 dark:bg-violet-900/60"
              >
                {tag}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleManualRevalidate}
          disabled={isPending}
          className="inline-flex items-center rounded-lg bg-violet-700 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? 'Revalidando...' : 'Revalidar cache agora'}
        </button>

        <button
          type="button"
          onClick={() => router.refresh()}
          className="inline-flex items-center rounded-lg border border-violet-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-violet-800 transition hover:bg-violet-100 dark:border-violet-700 dark:bg-zinc-900 dark:text-violet-200 dark:hover:bg-violet-950/60"
        >
          Atualizar rota
        </button>
      </div>

      {feedback && <p className="mt-3 text-xs font-medium text-violet-800 dark:text-violet-200">{feedback}</p>}
    </section>
  );
}
