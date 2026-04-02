// Metadata para personalizar o titulo da pagina dinamica de detalhe administrativo.
import type { Metadata } from 'next';
import { CacheObserver } from '@/app/components/cache-observer/cache-observer';
import { CACHE_REVALIDATE_SECONDS, CACHE_TAGS } from '@/app/lib/cache-config';
// Link do Next para navegacao entre a area admin e suas subrotas.
import Link from 'next/link';
// notFound e usado para invalidar ids incorretos ou inexistentes.
import { notFound } from 'next/navigation';

// Estrutura do usuario retornado pela API de exemplo.
interface AdminUserDetail {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
}

// Props da rota dinamica de usuarios no admin.
interface AdminUserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Busca um usuario por id para alimentar o detalhe dinamico server-side da area admin.
async function getAdminUserById(id: string): Promise<AdminUserDetail> {
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId <= 0) {
    notFound();
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    next: {
      revalidate: CACHE_REVALIDATE_SECONDS.adminUserDetail,
      tags: [CACHE_TAGS.adminUserDetail],
    },
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Falha ao carregar o usuario administrativo ${id}. Status: ${response.status}`);
  }

  return (await response.json()) as AdminUserDetail;
}

// Metadata dinamica da rota de detalhe administrativo.
export async function generateMetadata({
  params,
}: AdminUserDetailPageProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Admin Usuario ${id} | App Route - Next.js`,
    description: 'Detalhe dinamico server-side dentro do grupo (admin).',
  };
}

// Pagina server-side de detalhe de usuario administrativo acessada por /admin/usuarios/[id].
export default async function AdminUserDetailPage({ params }: AdminUserDetailPageProps) {
  const { id } = await params;
  const generatedAtIso = new Date().toISOString();
  const adminUser = await getAdminUserById(id);

  return (
    // Container principal do detalhe dinamico administrativo.
    <div className="flex flex-1 justify-center bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <div className="w-full max-w-4xl space-y-8">
        {/* Hero explicando o route group e a natureza dinamica da rota. */}
        <section className="rounded-2xl border border-cyan-300 bg-cyan-50 p-6 text-cyan-950 shadow-sm dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-100">
          <span className="inline-flex rounded-full border border-cyan-400 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-800 dark:border-cyan-800 dark:bg-zinc-900/60 dark:text-cyan-200">
            Server Component dinamico em (admin)
          </span>

          <h1 className="mt-4 text-3xl font-bold">Usuario administrativo #{adminUser.id}</h1>
          <p className="mt-3 text-sm leading-6 text-cyan-900/80 dark:text-cyan-200/80">
            Esta pagina esta em <strong>app/(admin)/admin/usuarios/[id]/page.tsx</strong>, mas o acesso publico acontece por <strong>/admin/usuarios/{adminUser.id}</strong>.
            O dado foi carregado no servidor com base no parametro dinamico da URL.
          </p>
        </section>

        {/* Bloco com os dados principais do usuario administrativo. */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-700 dark:bg-zinc-900">
            <span className="block text-xs uppercase tracking-wide text-gray-500">Nome</span>
            <strong className="mt-2 block text-lg text-gray-900 dark:text-gray-100">{adminUser.name}</strong>
          </div>
          <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-700 dark:bg-zinc-900">
            <span className="block text-xs uppercase tracking-wide text-gray-500">Usuario</span>
            <strong className="mt-2 block text-lg text-gray-900 dark:text-gray-100">@{adminUser.username}</strong>
          </div>
          <div className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-700 dark:bg-zinc-900">
            <span className="block text-xs uppercase tracking-wide text-gray-500">Empresa</span>
            <strong className="mt-2 block text-lg text-gray-900 dark:text-gray-100">{adminUser.company.name}</strong>
          </div>
        </section>

        {/* Secao secundaria com detalhes operacionais do usuario. */}
        <section className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Informacoes operacionais</h2>

          <dl className="mt-5 grid gap-4 text-sm text-gray-700 dark:text-gray-300 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-zinc-950">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Email</dt>
              <dd className="mt-2 font-medium">{adminUser.email}</dd>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-zinc-950">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Telefone</dt>
              <dd className="mt-2 font-medium">{adminUser.phone}</dd>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-zinc-950">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Cidade</dt>
              <dd className="mt-2 font-medium">{adminUser.address.city}</dd>
            </div>
            <div className="rounded-xl bg-gray-50 p-4 dark:bg-zinc-950">
              <dt className="text-xs uppercase tracking-wide text-gray-500">Website</dt>
              <dd className="mt-2 font-medium">{adminUser.website}</dd>
            </div>
          </dl>
        </section>

        <CacheObserver
          title="Observabilidade de Cache - Admin Usuario"
          generatedAtIso={generatedAtIso}
          revalidateInSeconds={CACHE_REVALIDATE_SECONDS.adminUserDetail}
          tags={[CACHE_TAGS.adminUserDetail]}
          scope="admin-user"
        />

        {/* Navegacao para retornar ao hub admin ou abrir a pagina cliente. */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
          >
            ← Voltar para Admin
          </Link>
          <Link
            href="/admin/cliente"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-zinc-800"
          >
            Ir para Admin Cliente
          </Link>
        </div>
      </div>
    </div>
  );
}