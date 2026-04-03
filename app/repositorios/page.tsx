import type { Metadata } from 'next';
import { RepositoriosClient } from './repositorios-client';

// Metadata exclusivo da rota /repositorios (sem impactar /repositorios/[id]).
export const metadata: Metadata = {
  title: 'Repositorios (GitHub Direto) | App Router Playground - Next.js 16',
  description:
    'Pagina de repositorios com busca client-side consultando diretamente a API externa do GitHub.',
  keywords: [
    'repositorios github',
    'next.js app router',
    'client side rendering',
    'react useEffect',
    'loading states',
    'typescript nextjs',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Repositorios (GitHub Direto) | App Router Playground',
    description:
      'Exploracao de repositorios com fetch no cliente diretamente no api.github.com.',
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://nextjs.org/api/og?title=Pagina%20de%20Repositorios',
        width: 1200,
        height: 630,
        alt: 'Pagina de repositorios no App Router Playground',
      },
      {
        url: 'https://nextjs.org/static/blog/next-13/twitter-card.png',
        width: 1200,
        height: 630,
        alt: 'Imagem de referencia do Next.js App Router',
      },
    ],
  },
};

export default function RepositoriosPage() {
  return <RepositoriosClient />;
}
