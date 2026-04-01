// Estado de carregamento exibido enquanto a Home espera a resposta da API no servidor.
export default function Loading() {
  return (
    // Estrutura centralizada para manter consistencia visual com o restante da aplicacao.
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-10 dark:bg-black">
      <div className="w-full max-w-xl rounded-lg border border-gray-300/60 bg-white/80 p-6 text-center shadow-sm dark:border-gray-700 dark:bg-zinc-900">
        {/* Mensagem principal do estado de carregamento. */}
        <strong className="text-lg text-gray-800 dark:text-gray-200">
          Carregando dados da API do GitHub...
        </strong>

        {/* Texto complementar explicando o que esta sendo aguardado. */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          A home esta aguardando os repositorios antes de renderizar o conteudo no servidor.
        </p>
      </div>
    </div>
  );
}