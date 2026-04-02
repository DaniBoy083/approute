# App Router Demo com Route Groups

Este projeto demonstra recursos importantes do App Router do Next.js 16 com exemplos comentados em portugues.

## Objetivo academico

Este repositorio existe para estudo pratico de:

- Server Components e Client Components.
- Route Groups no App Router.
- Loading, not-found e error boundaries.
- Cache de dados no servidor com `fetch` + `next.revalidate`.
- Revalidacao manual com `revalidateTag` e `revalidatePath`.

## O que existe no projeto

- Home server-side em `app/page.tsx`.
- Componente cliente `DonoRepo` renderizado dentro da home server-side.
- Lista de repositórios client-side em `app/repositorios/page.tsx`.
- Rota dinâmica server-side de repositório em `app/repositorios/[id]/page.tsx`.
- Página `not-found` estilizada em `app/not-found.tsx`.
- Página `not-found` exclusiva de repositórios em `app/repositorios/not-found.tsx`.
- Route group `(site)` organizando `dashboard` e `contatos` sem alterar as URLs.
- Route group `(admin)` organizando a área `/admin` sem alterar as URLs.
- Página cliente em `/admin/cliente`.
- Rota dinâmica server-side em `/admin/usuarios/[id]`.
- Loading específico da área administrativa em `app/(admin)/admin/loading.tsx`.
- Menu global no layout raiz para navegar por todas as áreas.
- Banner global deixando explicito o carater academico do projeto.
- Painel visual para observar cache e revalidate diretamente na interface.

## Estrutura principal de componentes e utilitarios

- `app/components/global-nav/global-nav.tsx`: navegacao global.
- `app/components/footer/footer.tsx`: rodape global.
- `app/components/academic-notice/academic-notice.tsx`: aviso academico fechavel.
- `app/components/donorepo/donorepo.tsx`: exemplo de interacao client-side dentro da Home server-side.
- `app/components/cache-observer/cache-observer.tsx`: painel client-side para visualizar cache e disparar revalidacao.
- `app/lib/cache-config.ts`: constantes centralizadas de tempo de revalidate e tags.
- `app/api/cache/revalidate/route.ts`: endpoint server-side para revalidacao manual.

## Estrutura de rotas

### Grupo `(site)`

Os arquivos abaixo ficam dentro do grupo `(site)`, mas o nome do grupo não aparece na URL:

- `app/(site)/dashboard/page.tsx` → `/dashboard`
- `app/(site)/dashboard/cadastro/page.tsx` → `/dashboard/cadastro`
- `app/(site)/dashboard/settings/page.tsx` → `/dashboard/settings`
- `app/(site)/contatos/page.tsx` → `/contatos`

### Grupo `(admin)`

Os arquivos abaixo ficam dentro do grupo `(admin)`, mas o nome do grupo também não aparece na URL:

- `app/(admin)/admin/page.tsx` → `/admin`
- `app/(admin)/admin/cliente/page.tsx` → `/admin/cliente`
- `app/(admin)/admin/usuarios/[id]/page.tsx` → `/admin/usuarios/[id]`

## Exemplos didáticos incluídos

### Server Component

- A home busca repositórios no servidor antes de entregar HTML.
- A página de detalhe de repositório em `/repositorios/[id]` usa `params` assíncrono do Next 16.
- A rota `/admin/usuarios/[id]` também usa renderização server-side com parâmetro dinâmico.

### Client Component

- `app/components/donorepo/donorepo.tsx` usa estado local para mostrar e ocultar a foto do dono do repositório.
- `/repositorios` busca dados no cliente com `useEffect`.
- `/admin/cliente` demonstra filtragem e estado local rodando no navegador.

### Tratamento de erro e fallback

- A home trata falhas de API e exibe estado vazio quando necessário.
- `app/not-found.tsx` mostra uma página 404 customizada.
- `app/repositorios/not-found.tsx` sobrescreve o 404 para o segmento de repositórios.
- `app/error.tsx` trata erros de runtime por segmento (Error Boundary).
- O detalhe dinâmico chama `notFound()` para parâmetros inválidos ou recursos ausentes.
- `app/(admin)/admin/loading.tsx` mostra loading específico da área administrativa.

## Cache e revalidate aplicados

As rotas server-side agora usam cache persistente com janela de revalidacao para reduzir chamadas repetidas e economizar processamento no servidor.

### Onde foi aplicado

- Home (`app/page.tsx`):
	- `fetch` com `next: { revalidate: 120, tags: ['github-repos'] }`.
- Detalhe de repositorio (`app/repositorios/[id]/page.tsx`):
	- `fetch` do GitHub com `revalidate: 300` e tag `github-repo-detail`.
	- `fetch` adicional de exemplo com `revalidate: 300` e tag `example-http`.
- Detalhe admin (`app/(admin)/admin/usuarios/[id]/page.tsx`):
	- `fetch` com `revalidate: 300` e tag `admin-user-detail`.

### Revalidacao manual

Endpoint: `POST /api/cache/revalidate`

Corpo JSON aceito:

- `{ "scope": "home" }`
- `{ "scope": "repo-detail" }`
- `{ "scope": "admin-user" }`
- `{ "scope": "all" }`

Internamente, o endpoint usa `revalidateTag(..., 'max')` e `revalidatePath(...)` para invalidar cache sem precisar reiniciar a aplicacao.

### Como visualizar o cache no front

Cada pagina server-side com cache exibe um card "Observabilidade de Cache" com:

- Horario de geracao no servidor.
- Janela de `revalidate` em segundos.
- Countdown da expiracao da janela atual.
- Tags usadas para invalidacao.
- Botao para revalidar cache agora.
- Botao para atualizar a rota.

Observacao importante para desenvolvimento local:

- Em `npm run dev`, o Next pode reaproveitar cache durante HMR.
- Para validar comportamento real de producao, prefira testar com `npm run build` + `npm run start`.

## Como executar

```bash
npm install
npm run dev
```

Depois, abra `http://localhost:3000`.

Para testar comportamento de producao (cache/revalidate mais fiel):

```bash
npm run build
npm run start
```

## Rotas para testar

- `/`
- `/repositorios`
- `/repositorios/1`
- `/dashboard`
- `/contatos`
- `/admin`
- `/admin/cliente`
- `/admin/usuarios/1`
- `/rota-que-nao-existe`

## Fluxo sugerido de teste de cache

1. Abra `/` e observe o horario no card de cache.
2. Recarregue rapidamente e confirme que o horario permanece igual dentro da janela.
3. Clique em "Revalidar cache agora" e depois "Atualizar rota".
4. Verifique que o horario e renovado.
5. Repita o teste em `/repositorios/1` e `/admin/usuarios/1`.

## Observações de implementação

- O projeto segue App Router com comentários explicativos nos arquivos principais.
- A documentação local do Next 16 em `node_modules/next/dist/docs` foi usada como referência para `params` assíncrono, `not-found` e `route groups`.
- O projeto usa Tailwind CSS 4, ESLint com regras do Next e fontes Geist via `next/font`.
- O arquivo `app/lib/cache-config.ts` centraliza as decisoes de cache para facilitar evolucao e manutencao.
