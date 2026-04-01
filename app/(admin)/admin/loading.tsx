// Estado de carregamento especifico da secao /admin e de suas subrotas.
export default function AdminLoading() {
  return (
    // Container com identidade visual da area administrativa.
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 py-12 dark:bg-black">
      <div className="w-full max-w-2xl rounded-2xl border border-cyan-300 bg-cyan-50 p-8 text-center text-cyan-950 shadow-sm dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-100">
        {/* Titulo do estado de carregamento. */}
        <strong className="text-lg">Carregando a area administrativa...</strong>

        {/* Explicacao do porque este loading existe neste segmento. */}
        <p className="mt-3 text-sm leading-6 text-cyan-900/80 dark:text-cyan-200/80">
          Este loading.tsx pertence ao segmento <strong>/admin</strong> e cobre as rotas internas da area administrativa, incluindo a pagina cliente e os detalhes dinamicos.
        </p>
      </div>
    </div>
  );
}