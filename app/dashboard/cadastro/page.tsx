// Pagina de cadastro acessada pela rota /dashboard/cadastro.
// Por estar dentro da pasta dashboard/, herda automaticamente o
// app/dashboard/layout.tsx sem nenhuma configuracao extra.
// Hierarquia de layouts aplicada:
//   app/layout.tsx  →  app/dashboard/layout.tsx  →  esta pagina.

import Link from 'next/link';

export default function Cadastro() {
  return (
    // Conteudo centralizado seguindo o padrao visual das demais paginas.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">

      {/* Titulo da pagina */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Cadastro
      </h1>

      {/* Descricao */}
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Rota /dashboard/cadastro — utiliza o layout aninhado do Dashboard.
      </p>

      {/* Formulario de exemplo */}
      <section className="mt-8 w-full max-w-md rounded-lg border border-gray-300/60 p-6 text-gray-700 dark:border-gray-700 dark:text-gray-300">
        <h2 className="mb-4 text-xl font-semibold">Novo registro</h2>

        {/* Campo nome */}
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nome
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Digite o nome"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-200 dark:placeholder-gray-600"
          />
        </div>

        {/* Campo email */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite o e-mail"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-200 dark:placeholder-gray-600"
          />
        </div>

        {/* Botao de envio — apenas visual, sem action real neste exemplo */}
        <button
          type="button"
          className="w-full rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          Cadastrar
        </button>
      </section>

      {/* Acoes de navegacao */}
      <div className="mt-6 flex gap-3">
        {/* Volta para o dashboard pai */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          ← Voltar para Dashboard
        </Link>

        {/* Volta para a home */}
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
