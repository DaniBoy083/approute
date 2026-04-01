'use client';

// Image do Next para manter o padrao do framework ao renderizar a foto.
import Image from 'next/image';
// useState permite controlar a exibicao da foto no navegador.
import { useState } from 'react';

// Props recebidas do componente de servidor com os dados do dono do repositorio.
interface DonoRepoProps {
  owner: {
    login: string;
    avatarUrl: string;
    profileUrl: string;
  };
}

// Componente cliente responsavel pela interacao local de mostrar ou ocultar a foto.
export function DonoRepo({ owner }: DonoRepoProps) {
  // Estado local usado apenas no cliente para alternar a foto do dono.
  const [showAvatar, setShowAvatar] = useState(false);

  return (
    // Card principal do componente cliente exibido dentro da Home Server Component.
    <section className="mt-8 w-full max-w-2xl rounded-lg border border-gray-300/60 bg-white/80 p-5 text-gray-700 shadow-sm dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300">
      {/* Selo visual indicando que este arquivo e um Client Component. */}
      <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
        Client Component
      </span>

      {/* Titulo da secao com as informacoes do dono do repositorio. */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Dono do repositorio
      </h2>

      {/* Texto explicando que o dado vem do servidor, mas a interatividade fica no cliente. */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Este componente usa estado no cliente, mas recebe os dados pela home renderizada no servidor.
      </p>

      {/* Bloco com os dados do dono e o botao que altera o estado local. */}
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {/* Login do dono do repositorio recebido via props. */}
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">@{owner.login}</p>

          {/* Link externo para o perfil publico do GitHub. */}
          <a
            href={owner.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-blue-700 underline-offset-4 hover:underline dark:text-blue-400"
          >
            Ver perfil no GitHub
          </a>
        </div>

        {/* Botao que alterna a exibicao da imagem no navegador. */}
        <button
          type="button"
          onClick={() => setShowAvatar((currentValue) => !currentValue)}
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
        >
          {showAvatar ? 'Ocultar foto do dono do repositorio' : 'Exibir foto do dono do repositorio'}
        </button>
      </div>

      {/* A foto so aparece depois da interacao do usuario no Client Component. */}
      {showAvatar && (
        <div className="mt-5 flex flex-col items-start gap-3 rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-700">
          {/* Foto remota do GitHub renderizada sem otimizacao para evitar erro de host remoto. */}
          <Image
            src={owner.avatarUrl}
            alt={`Foto de perfil de ${owner.login}`}
            width={120}
            height={120}
            unoptimized
            className="rounded-full border border-gray-300 object-cover dark:border-gray-700"
          />

          {/* Texto auxiliar confirmando que a foto surgiu apos um evento de cliente. */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Foto carregada apos interacao no componente cliente.
          </p>
        </div>
      )}
    </section>
  );
}