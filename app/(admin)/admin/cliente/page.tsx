'use client';

// Hooks do React usados para interatividade no navegador.
import { useMemo, useState } from 'react';
// Link do Next para navegacao entre as rotas da area admin.
import Link from 'next/link';

// Lista simples de modulos administrativos para demonstrar filtragem client-side.
const adminModules = [
  'Usuarios',
  'Permissoes',
  'Relatorios',
  'Logs',
  'Backups',
  'Configuracoes',
];

// Pagina cliente acessivel por /admin/cliente.
export default function AdminClientPage() {
  // Estado local usado para filtrar os modulos exibidos na interface.
  const [searchTerm, setSearchTerm] = useState('');
  // Estado local usado para simular habilitacao de monitoramento em tempo real.
  const [liveMode, setLiveMode] = useState(true);

  // Filtra os itens no cliente conforme o texto digitado pelo usuario.
  const filteredModules = useMemo(() => {
    return adminModules.filter((moduleName) =>
      moduleName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    // Container principal da pagina cliente administrativa.
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      {/* Titulo que sinaliza explicitamente o tipo do componente. */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Admin Cliente
      </h1>

      {/* Explicacao resumida do papel desta rota dentro do grupo admin. */}
      <p className="mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
        Esta pagina esta em <strong>app/(admin)/admin/cliente/page.tsx</strong>, usa <strong>use client</strong> e demonstra interatividade no navegador dentro do grupo administrativo.
      </p>

      {/* Cartao explicando a relacao entre grupo de rotas, URL e componente cliente. */}
      <section className="mt-8 w-full max-w-3xl rounded-2xl border border-cyan-300 bg-cyan-50 p-5 text-cyan-900 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-200">
        <h2 className="text-lg font-semibold">Explicacao visual da rota cliente</h2>
        <p className="mt-2 text-sm leading-6">
          O grupo <strong>(admin)</strong> organiza esta rota, mas a URL publica permanece <strong>/admin/cliente</strong>. Como esta pagina e um Client Component, os estados e eventos abaixo rodam no navegador apos a hidratacao.
        </p>
      </section>

      {/* Painel interativo para demonstrar estado local e renderizacao cliente. */}
      <section className="mt-8 grid w-full max-w-3xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Buscar modulo administrativo
          </label>
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Digite para filtrar os modulos..."
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 dark:border-gray-700 dark:bg-zinc-950 dark:text-gray-200"
          />

          <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 p-4 dark:bg-zinc-950">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Monitoramento em tempo real</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Estado local alterado no cliente.</p>
            </div>
            <button
              type="button"
              onClick={() => setLiveMode((currentValue) => !currentValue)}
              className="rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-600"
            >
              {liveMode ? 'Desativar' : 'Ativar'}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Resultado no cliente</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Modulos encontrados: {filteredModules.length}. Live mode: {liveMode ? 'ativo' : 'inativo'}.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {filteredModules.map((moduleName) => (
              <li key={moduleName} className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-zinc-950">
                {moduleName}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Links para voltar ao hub admin e testar a rota dinamica. */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/admin"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          ← Voltar para Admin
        </Link>
        <Link
          href="/admin/usuarios/1"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
        >
          Ver detalhe dinamico
        </Link>
      </div>
    </div>
  );
}