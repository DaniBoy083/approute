# App Router Demo com Route Groups

Este projeto demonstra recursos importantes do App Router do Next.js 16 com exemplos comentados em portugues.

## O que existe no projeto

- Home server-side em `app/page.tsx`.
- Componente cliente `DonoRepo` renderizado dentro da home server-side.
- Lista de repositórios client-side em `app/repositorios/page.tsx`.
- Rota dinâmica server-side de repositório em `app/repositorios/[id]/page.tsx`.
- Página `not-found` estilizada em `app/not-found.tsx`.
- Route group `(site)` organizando `dashboard` e `contatos` sem alterar as URLs.
- Route group `(admin)` organizando a área `/admin` sem alterar as URLs.
- Página cliente em `/admin/cliente`.
- Rota dinâmica server-side em `/admin/usuarios/[id]`.
- Loading específico da área administrativa em `app/(admin)/admin/loading.tsx`.
- Menu global no layout raiz para navegar por todas as áreas.

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
- O detalhe dinâmico chama `notFound()` para parâmetros inválidos ou recursos ausentes.
- `app/(admin)/admin/loading.tsx` mostra loading específico da área administrativa.

## Como executar

```bash
npm install
npm run dev
```

Depois, abra `http://localhost:3000`.

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

## Observações de implementação

- O projeto segue App Router com comentários explicativos nos arquivos principais.
- A documentação local do Next 16 em `node_modules/next/dist/docs` foi usada como referência para `params` assíncrono, `not-found` e `route groups`.
- O projeto usa Tailwind CSS 4, ESLint com regras do Next e fontes Geist via `next/font`.
