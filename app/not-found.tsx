// Link do Next para retornar a areas validas da aplicacao.
import Link from 'next/link';

// Pagina 404 customizada usada tanto para rotas inexistentes quanto para notFound() nas rotas.
export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.14),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_30%)] bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,rgba(113,113,122,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(113,113,122,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

      <section className="relative z-10 w-full max-w-2xl rounded-3xl border border-gray-300/60 bg-white/90 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.08)] dark:border-gray-700 dark:bg-zinc-900/90 dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
        <span className="inline-flex rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          Error 404
        </span>

        <h1 className="mt-5 text-5xl font-black tracking-tight text-gray-950 dark:text-gray-50 sm:text-6xl">
          Pagina nao encontrada
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-400">
          O caminho acessado nao existe ou o repositorio solicitado nao foi encontrado pela busca server-side.
        </p>

        <div className="mt-8 grid gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left text-sm text-gray-700 dark:border-gray-800 dark:bg-zinc-950 dark:text-gray-300 sm:grid-cols-2">
          <div>
            <span className="block text-xs uppercase tracking-wide text-gray-500">Quando aparece</span>
            <p className="mt-2">URLs invalidas, ids inexistentes e chamadas que executam notFound().</p>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wide text-gray-500">Exemplo</span>
            <p className="mt-2">/repositorios/999999999999</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            Ir para Home
          </Link>
          <Link
            href="/repositorios"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
          >
            Ver lista de repositorios
          </Link>
        </div>
      </section>
    </div>
  );
}