'use client';

import { useState } from 'react';
import Link from 'next/link';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface RequestResult {
  method: HttpMethod;
  endpoint: string;
  status: number;
  ok: boolean;
  payload: unknown;
}

// Painel interativo para testar os metodos HTTP nas APIs do projeto.
export function ApiPlaygroundClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RequestResult | null>(null);
  const [error, setError] = useState('');
  const [customEndpoint, setCustomEndpoint] = useState('/api/repos');
  const [customMethod, setCustomMethod] = useState<HttpMethod>('POST');
  const [customJsonBody, setCustomJsonBody] = useState(`{
  "name": "repo-personalizado",
  "description": "Payload enviado pelo playground"
}`);

  async function callApi(method: HttpMethod, endpoint: string, body?: unknown) {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, {
        method,
        headers: body ? { 'content-type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });

      const payload = (await response.json().catch(() => ({}))) as unknown;

      setResult({
        method,
        endpoint,
        status: response.status,
        ok: response.ok,
        payload,
      });
    } catch {
      setError('Falha de rede ao chamar a API. Verifique se a aplicacao esta em execucao.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCustomRequest() {
    const endpoint = customEndpoint.trim();

    if (!endpoint.startsWith('/api/')) {
      setError('Endpoint invalido. Use um caminho iniciado por /api/.');
      return;
    }

    if (customMethod === 'POST' || customMethod === 'PATCH') {
      try {
        const parsedBody = JSON.parse(customJsonBody) as unknown;
        void callApi(customMethod, endpoint, parsedBody);
      } catch {
        setError('JSON invalido no payload customizado. Corrija antes de enviar.');
      }
      return;
    }

    void callApi(customMethod, endpoint);
  }

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <div className="w-full max-w-5xl space-y-8">
        <header className="rounded-2xl border border-gray-300/60 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <p className="inline-flex rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            API Playground
          </p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Teste de GET, POST, PATCH e DELETE
          </h1>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Esta tela executa chamadas reais para as rotas de API do projeto e mostra a resposta completa para cada metodo.
          </p>
        </header>

        <section className="rounded-2xl border border-gray-300/60 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">1) Endpoint Health: /api/health</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Uso recomendado: validar disponibilidade da API e testar metodos sem efeitos colaterais.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => callApi('GET', '/api/health')} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300">GET</button>
            <button type="button" onClick={() => callApi('POST', '/api/health')} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300">POST</button>
            <button type="button" onClick={() => callApi('PATCH', '/api/health')} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300">PATCH</button>
            <button type="button" onClick={() => callApi('DELETE', '/api/health')} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300">DELETE</button>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-300/70 bg-emerald-50/70 p-6 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/20">
          <h2 className="text-xl font-semibold text-emerald-900 dark:text-emerald-200">2) Endpoint Colecao: /api/repos</h2>
          <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-200/80">Uso recomendado: listar repositorios e simular operacoes em lote.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => callApi('GET', '/api/repos?user=DaniBoy083&limit=5')} className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-300">GET</button>
            <button type="button" onClick={() => callApi('POST', '/api/repos', { name: 'repo-demo', description: 'Criado no playground' })} className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-300">POST</button>
            <button type="button" onClick={() => callApi('PATCH', '/api/repos', { action: 'refresh-cache' })} className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-300">PATCH</button>
            <button type="button" onClick={() => callApi('DELETE', '/api/repos?confirm=true')} className="rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-zinc-900 dark:text-emerald-300">DELETE</button>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/70 bg-amber-50/70 p-6 shadow-sm dark:border-amber-900 dark:bg-amber-950/20">
          <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-200">3) Endpoint Recurso: /api/repos/[id]</h2>
          <p className="mt-2 text-sm text-amber-900/80 dark:text-amber-200/80">Uso recomendado: consultar e simular alteracoes em um repositorio especifico.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => callApi('GET', '/api/repos/28457823')} className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-zinc-900 dark:text-amber-300">GET</button>
            <button type="button" onClick={() => callApi('POST', '/api/repos/28457823', { note: 'Anotacao criada no playground' })} className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-zinc-900 dark:text-amber-300">POST</button>
            <button type="button" onClick={() => callApi('PATCH', '/api/repos/28457823', { favorite: true, note: 'Marcado para estudo' })} className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-zinc-900 dark:text-amber-300">PATCH</button>
            <button type="button" onClick={() => callApi('DELETE', '/api/repos/28457823?confirm=true')} className="rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-semibold text-amber-800 hover:bg-amber-100 dark:border-amber-900 dark:bg-zinc-900 dark:text-amber-300">DELETE</button>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-300/60 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">4) Requisicao customizada</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Defina endpoint, metodo e JSON do corpo para testar cenarios personalizados sem editar codigo.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300 md:col-span-2">
              Endpoint
              <input
                type="text"
                value={customEndpoint}
                onChange={(event) => setCustomEndpoint(event.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-200"
                placeholder="/api/repos"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
              Metodo
              <select
                value={customMethod}
                onChange={(event) => setCustomMethod(event.target.value as HttpMethod)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-200"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
              </select>
            </label>
          </div>

          <label className="mt-4 flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300">
            Payload JSON (usado em POST/PATCH)
            <textarea
              value={customJsonBody}
              onChange={(event) => setCustomJsonBody(event.target.value)}
              rows={7}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-xs text-gray-800 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-200"
            />
          </label>

          <div className="mt-4">
            <button
              type="button"
              onClick={handleCustomRequest}
              className="rounded-lg border border-blue-300 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300"
            >
              Executar requisicao customizada
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-300/60 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Resultado da chamada</h2>

          {isLoading && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Executando requisicao...</p>}

          {error && <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}

          {result && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Metodo: <strong>{result.method}</strong> | Endpoint: <strong>{result.endpoint}</strong> | Status: <strong>{result.status}</strong>
              </p>
              <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800 dark:border-gray-800 dark:bg-zinc-950 dark:text-gray-200">
                {JSON.stringify(result.payload, null, 2)}
              </pre>
            </div>
          )}
        </section>

        <nav className="flex flex-wrap gap-3">
          <Link href="/" className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800">Voltar para Home</Link>
          <Link href="/repositorios" className="inline-flex items-center rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">Repositorios (GitHub Direto)</Link>
          <Link href="/repositorios-api" className="inline-flex items-center rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">Repositorios (API Interna)</Link>
        </nav>
      </div>
    </div>
  );
}
