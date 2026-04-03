import type { Metadata } from 'next';
import { RepositoriosApiClient } from './repositorios-api-client';

// Metadata dedicado da pagina que consome a API interna do projeto.
export const metadata: Metadata = {
  title: 'Repositorios (API Interna) | App Router Playground - Next.js 16',
  description:
    'Pagina de repositorios com busca client-side via API interna /api/repos para demonstrar padrao BFF no App Router.',
  keywords: [
    'api interna nextjs',
    'route handlers',
    'app router api',
    'repositorios api',
    'bff nextjs',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Repositorios (API Interna) | App Router Playground',
    description:
      'Versao da tela de repositorios que consome a API interna /api/repos em vez da API externa diretamente.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://nextjs.org/api/og?title=Repositorios%20API%20Interna',
        width: 1200,
        height: 630,
        alt: 'Pagina de repositorios consumindo API interna no Next.js',
      },
    ],
  },
};

// Page server-side que renderiza o componente cliente de consulta via /api/repos.
export default function RepositoriosApiPage() {
  return <RepositoriosApiClient />;
}
