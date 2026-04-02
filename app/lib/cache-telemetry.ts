// Chave unica para armazenar a ultima revalidacao manual no navegador.
export const CACHE_LAST_REVALIDATED_AT_KEY = 'cache:last-revalidated-at';

// Evento customizado para sincronizar atualizacao no mesmo tab sem recarregar.
export const CACHE_REVALIDATED_EVENT = 'cache-revalidated';

export interface CacheRevalidatedDetail {
  revalidatedAt: string;
}
