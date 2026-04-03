import { CACHE_REVALIDATE_SECONDS, CACHE_TAGS } from '@/app/lib/cache-config';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface CreateRepoInput {
  name?: string;
  description?: string;
}

interface PatchReposInput {
  action?: 'refresh-cache' | 'tag';
  tag?: string;
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

// Lista repositorios de um usuario GitHub com suporte a query params.
// Exemplo: /api/repos?user=DaniBoy083&limit=12
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user')?.trim() || 'DaniBoy083';
  const limitParam = searchParams.get('limit') ?? '10';
  const limit = Number(limitParam);

  if (!Number.isInteger(limit) || limit <= 0 || limit > 50) {
    return badRequest('Parametro "limit" deve ser um inteiro entre 1 e 50.');
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=${limit}`,
      {
        next: {
          revalidate: CACHE_REVALIDATE_SECONDS.homeRepos,
          tags: [CACHE_TAGS.githubRepos],
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        return Response.json({ error: `Usuario GitHub "${user}" nao encontrado.` }, { status: 404 });
      }

      return Response.json(
        { error: `Falha ao consultar GitHub. Status: ${response.status}.` },
        { status: 502 },
      );
    }

    const repos = (await response.json()) as GitHubRepo[];

    return Response.json({
      user,
      total: repos.length,
      generatedAt: new Date().toISOString(),
      repos: repos.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        url: repo.html_url,
      })),
    });
  } catch {
    return Response.json(
      { error: 'Nao foi possivel consultar o GitHub no momento.' },
      { status: 500 },
    );
  }
}

// Simula criacao de recurso de repositorio para fins didaticos (sem banco/persistencia).
// Exemplo body: { "name": "meu-repo", "description": "repo de estudo" }
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateRepoInput;

    if (!body.name?.trim()) {
      return badRequest('Campo "name" e obrigatorio para POST em /api/repos.');
    }

    return Response.json(
      {
        message: 'POST recebido com sucesso (simulado, sem persistencia).',
        created: {
          id: Date.now(),
          name: body.name.trim(),
          description: body.description?.trim() || null,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    );
  } catch {
    return badRequest('Body invalido. Envie JSON valido no POST /api/repos.');
  }
}

// Simula atualizacao parcial em lote na colecao (sem persistencia).
// Exemplo body: { "action": "refresh-cache" }
export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as PatchReposInput;
    const action = body.action || 'refresh-cache';

    return Response.json({
      message: 'PATCH recebido com sucesso (simulado, sem persistencia).',
      updated: {
        scope: 'collection',
        action,
        tag: body.tag || null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch {
    return badRequest('Body invalido. Envie JSON valido no PATCH /api/repos.');
  }
}

// Simula exclusao em lote na colecao (sem persistencia).
// Exemplo: /api/repos?confirm=true
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const confirm = searchParams.get('confirm');

  if (confirm !== 'true') {
    return badRequest('Para DELETE /api/repos, envie ?confirm=true para confirmar a operacao.');
  }

  return Response.json({
    message: 'DELETE recebido com sucesso (simulado, sem persistencia).',
    deleted: {
      scope: 'collection',
      confirmed: true,
    },
    timestamp: new Date().toISOString(),
  });
}
