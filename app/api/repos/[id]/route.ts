import { CACHE_REVALIDATE_SECONDS, CACHE_TAGS } from '@/app/lib/cache-config';

interface GitHubRepoDetail {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  visibility: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

interface RepoByIdRouteContext {
  params: Promise<{
    id: string;
  }>;
}

interface PatchRepoByIdInput {
  note?: string;
  favorite?: boolean;
}

// Retorna o detalhe de um repositorio GitHub pelo id numerico.
// Exemplo: /api/repos/28457823
export async function GET(_: Request, context: RepoByIdRouteContext) {
  const { id } = await context.params;
  const repoId = Number(id);

  if (!Number.isInteger(repoId) || repoId <= 0) {
    return badRequest('Parametro "id" deve ser um inteiro positivo.');
  }

  try {
    const response = await fetch(`https://api.github.com/repositories/${repoId}`, {
      next: {
        revalidate: CACHE_REVALIDATE_SECONDS.repoDetail,
        tags: [CACHE_TAGS.githubRepoDetail],
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return Response.json({ error: `Repositorio com id ${repoId} nao encontrado.` }, { status: 404 });
      }

      return Response.json(
        { error: `Falha ao consultar detalhe no GitHub. Status: ${response.status}.` },
        { status: 502 },
      );
    }

    const repo = (await response.json()) as GitHubRepoDetail;

    return Response.json({
      generatedAt: new Date().toISOString(),
      repo: {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        visibility: repo.visibility,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        url: repo.html_url,
        owner: {
          login: repo.owner.login,
          avatarUrl: repo.owner.avatar_url,
          profileUrl: repo.owner.html_url,
        },
      },
    });
  } catch {
    return Response.json(
      { error: 'Nao foi possivel consultar o detalhe do repositorio no momento.' },
      { status: 500 },
    );
  }
}

// Simula criacao de um recurso relacionado ao repositorio especifico (sem persistencia).
// Exemplo body: { "note": "observacao de estudo" }
export async function POST(request: Request, context: RepoByIdRouteContext) {
  const { id } = await context.params;
  const repoId = Number(id);

  if (!Number.isInteger(repoId) || repoId <= 0) {
    return badRequest('Parametro "id" deve ser um inteiro positivo.');
  }

  try {
    const body = (await request.json()) as { note?: string };

    return Response.json(
      {
        message: 'POST recebido com sucesso (simulado, sem persistencia).',
        repoId,
        created: {
          note: body.note?.trim() || null,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 },
    );
  } catch {
    return badRequest('Body invalido. Envie JSON valido no POST /api/repos/[id].');
  }
}

// Simula atualizacao parcial do recurso por id (sem persistencia).
// Exemplo body: { "favorite": true, "note": "marcado para revisar" }
export async function PATCH(request: Request, context: RepoByIdRouteContext) {
  const { id } = await context.params;
  const repoId = Number(id);

  if (!Number.isInteger(repoId) || repoId <= 0) {
    return badRequest('Parametro "id" deve ser um inteiro positivo.');
  }

  try {
    const body = (await request.json()) as PatchRepoByIdInput;

    return Response.json({
      message: 'PATCH recebido com sucesso (simulado, sem persistencia).',
      repoId,
      updated: {
        favorite: body.favorite ?? null,
        note: body.note?.trim() || null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch {
    return badRequest('Body invalido. Envie JSON valido no PATCH /api/repos/[id].');
  }
}

// Simula exclusao do recurso por id (sem persistencia).
// Exemplo: /api/repos/28457823?confirm=true
export async function DELETE(request: Request, context: RepoByIdRouteContext) {
  const { id } = await context.params;
  const repoId = Number(id);
  const { searchParams } = new URL(request.url);
  const confirm = searchParams.get('confirm');

  if (!Number.isInteger(repoId) || repoId <= 0) {
    return badRequest('Parametro "id" deve ser um inteiro positivo.');
  }

  if (confirm !== 'true') {
    return badRequest('Para DELETE /api/repos/[id], envie ?confirm=true para confirmar a operacao.');
  }

  return Response.json({
    message: 'DELETE recebido com sucesso (simulado, sem persistencia).',
    deleted: {
      repoId,
      confirmed: true,
    },
    timestamp: new Date().toISOString(),
  });
}
