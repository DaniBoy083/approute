import { revalidatePath, revalidateTag } from 'next/cache';
import type { CacheRevalidateScope } from '@/app/lib/cache-config';
import { CACHE_TAGS } from '@/app/lib/cache-config';

interface RevalidateRequestBody {
  scope?: CacheRevalidateScope;
}

// Endpoint server-side para revalidacao manual sem sair da interface.
export async function POST(request: Request) {
  let scope: CacheRevalidateScope = 'all';

  try {
    const body = (await request.json()) as RevalidateRequestBody;
    if (body.scope) {
      scope = body.scope;
    }
  } catch {
    // Mantem escopo padrao quando o corpo nao e enviado.
  }

  if (scope === 'home' || scope === 'all') {
    revalidateTag(CACHE_TAGS.githubRepos, 'max');
    revalidatePath('/');
  }

  if (scope === 'repo-detail' || scope === 'all') {
    revalidateTag(CACHE_TAGS.githubRepoDetail, 'max');
    revalidateTag(CACHE_TAGS.exampleHttp, 'max');
    revalidatePath('/repositorios/[id]', 'page');
  }

  if (scope === 'admin-user' || scope === 'all') {
    revalidateTag(CACHE_TAGS.adminUserDetail, 'max');
    revalidatePath('/admin/usuarios/[id]', 'page');
  }

  return Response.json({
    message: `Revalidacao solicitada para o escopo: ${scope}`,
    revalidatedAt: new Date().toISOString(),
  });
}
