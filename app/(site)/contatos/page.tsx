// Pagina de contatos acessivel pela rota /contatos.
// Embora o arquivo esteja em app/(site)/contatos/page.tsx, o grupo (site) nao entra na URL.
import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// Metadados especificos desta rota.
export const metadata: Metadata = {
  title: 'Contatos | App Route - Next.js',
  description: 'Pagina de contatos do aplicativo Next.js com App Router.',
};

// Componente da pagina de contatos.
export default function Contatos() {
  return (
    // Container centralizado para o conteudo da rota.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Titulo principal da pagina. */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Pagina Contatos
      </h1>

      {/* Texto introdutorio para o usuario. */}
      <span className="mt-3 text-gray-600 dark:text-gray-400">
        Bem-vindo a pagina de contatos do nosso aplicativo Next.js.
      </span>

      {/* Card visual explicando o uso do route group (site). */}
      <section className="mt-8 w-full max-w-2xl rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        <h2 className="text-lg font-semibold">Explicacao visual do route group</h2>
        <p className="mt-2 text-sm leading-6">
          Esta pagina foi movida para a pasta <strong>app/(site)/contatos</strong>, mas continua sendo acessada pela URL <strong>/contatos</strong>.
          O nome do grupo serve apenas para organizacao interna do projeto.
        </p>
      </section>

      {/* Links de navegacao para outras areas relevantes. */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ir para Dashboard
        </Link>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ir para Admin
        </Link>
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