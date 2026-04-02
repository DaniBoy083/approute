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
  // Estado usado para disparar um erro intencional e testar a error boundary da rota.
  const [shouldSimulateError, setShouldSimulateError] = useState(false);

  if (shouldSimulateError) {
    throw new Error('Erro simulado pelo botao do Client Component para testar app/error.tsx.');
  }

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

      {/* Bloco com os dados do dono e os botoes de interacao no cliente. */}
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

        <div className="flex flex-wrap items-center gap-2">
          {/* Botao que alterna a exibicao da imagem no navegador. */}
          <button
            type="button"
            onClick={() => setShowAvatar((currentValue) => !currentValue)}
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
          >
            {showAvatar ? 'Ocultar foto do dono do repositorio' : 'Exibir foto do dono do repositorio'}
          </button>

          {/* Botao de teste para acionar app/error.tsx sem alterar a rota manualmente. */}
          <button
            type="button"
            onClick={() => setShouldSimulateError(true)}
            className="inline-flex items-center justify-center rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
          >
            Simular erro
          </button>
        </div>
      </div>

      {/* Card explicando por que o overlay aparece em desenvolvimento ao simular erro. */}
      <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
        <p className="font-semibold">Sobre a simulacao de erro</p>
        <p className="mt-2">
          Em desenvolvimento (localhost), o Next mostra o overlay vermelho de debug com stack trace.
        </p>
        <p className="mt-1">
          Em producao (build + start), o fallback exibido para o mesmo erro e a tela definida em app/error.tsx.
        </p>
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