//Pagina de contatos do nosso aplicativo Next.js. Esta página é acessada através da rota "/contatos". O arquivo "page.tsx" dentro da pasta "contatos" define o componente para esta página. O conteúdo do arquivo é o seguinte:
// Este componente é semelhante ao componente da página Home, mas com um título e uma mensagem diferentes para refletir o conteúdo da página de contatos. Ele também utiliza as mesmas classes do Tailwind CSS para manter a consistência visual em todo o aplicativo. O componente é exportado como padrão para que possa ser renderizado quando o usuário acessar a rota "/contatos".
// Importação do React (opcional em Next.js 13+ com o uso de JSX automático)
import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatos | App Route - Next.js',
  description: 'Pagina de contatos do aplicativo Next.js com App Router.',
};

export default function Contatos() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
            Pagina Contatos
        </h1>
        <span className="text-gray-600 dark:text-gray-400">
            Bem-vindo à página de contatos do nosso aplicativo Next.js!
        </span>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          ← Voltar para Home
        </Link>
    </div>
  );
}
