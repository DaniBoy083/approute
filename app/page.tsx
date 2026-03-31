// Home em Server Component: os dados sao buscados no servidor antes do HTML ser enviado.

interface RepoProps {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string;
}

// Busca os repositorios no servidor (App Router + Server Component).
async function getData() {
  const res = await fetch('https://api.github.com/users/DaniBoy083/repos');
  return res.json();
}

export default async function Home() {
  const repos = await getData();
  console.log('Home component rodou no servidor'); // Log para demonstrar que isso roda no servidor
  console.log('Repositorios carregados no servidor:', repos.length); // Log para mostrar quantos repositorios foram carregados

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Pagina Home (Server Component)
      </h1>

      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Repositorios do GitHub de DaniBoy083 (renderizados no servidor):
      </p>

      {/* Listagem renderizada com os dados ja resolvidos no servidor. */}
      <ul className="mt-2 list-disc text-gray-600 dark:text-gray-400">
        {repos.map((repo: RepoProps) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>

      {/* Comparativo solicitado: principais pontos de renderizacao no servidor. */}
      <section className="mt-8 w-full max-w-2xl rounded-lg border border-gray-300/60 p-4 text-gray-700 dark:border-gray-700 dark:text-gray-300">
        <h2 className="text-xl font-semibold">Renderizacao no servidor (Home)</h2>
        <p className="mt-2 font-medium">Vantagens:</p>
        <ul className="list-disc pl-6">
          <li>Melhor SEO, pois o HTML chega pronto para indexacao.</li>
          <li>Menor trabalho inicial no navegador do usuario.</li>
          <li>Dados sensiveis podem ficar no servidor.</li>
        </ul>
        <p className="mt-3 font-medium">Desvantagens:</p>
        <ul className="list-disc pl-6">
          <li>Interatividade com hooks do React nao pode ficar neste arquivo sem use client.</li>
          <li>Cada requisicao pode depender mais do servidor.</li>
          <li>Pode aumentar tempo de resposta se a API for lenta.</li>
        </ul>
      </section>
    </div>
  );
}
