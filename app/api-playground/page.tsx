import type { Metadata } from 'next';
import { ApiPlaygroundClient } from './api-playground-client';

// Metadata da pagina de laboratorio para testes de API na interface.
export const metadata: Metadata = {
  title: 'API Playground | App Router Playground - Next.js 16',
  description:
    'Painel interativo para testar GET, POST, PATCH e DELETE nas rotas API do projeto.',
  robots: {
    index: true,
    follow: true,
  },
};

// Page server-side que apenas encapsula o painel client-side de testes.
export default function ApiPlaygroundPage() {
  return <ApiPlaygroundClient />;
}
