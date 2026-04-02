// Configuracoes centralizadas de cache para facilitar manutencao e leitura didatica.
export const CACHE_REVALIDATE_SECONDS = {
  // Home e listagem principal de repositorios.
  homeRepos: 120,
  // Detalhe dinamico de repositorio por id.
  repoDetail: 300,
  // Requisicao secundaria didatica de exemplo HTTP.
  exampleHttp: 300,
  // Detalhe de usuario administrativo.
  adminUserDetail: 300,
} as const;

// Tags usadas pelo Next para revalidacao sob demanda via revalidateTag().
export const CACHE_TAGS = {
  githubRepos: 'github-repos',
  githubRepoDetail: 'github-repo-detail',
  exampleHttp: 'example-http',
  adminUserDetail: 'admin-user-detail',
} as const;

export type CacheRevalidateScope = 'home' | 'repo-detail' | 'admin-user' | 'all';
