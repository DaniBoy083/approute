// Tipagem de metadata usada pelo App Router para configurar titulo e descricao globais.
import type { Metadata } from "next";
// Fontes otimizadas pelo Next para serem aplicadas no layout raiz.
import { Geist, Geist_Mono } from "next/font/google";
// Navegacao global visivel em toda a aplicacao.
import { GlobalNav } from "./components/global-nav/global-nav";
// Aviso global informando que o projeto e de estudo.
import { AcademicNotice } from "./components/academic-notice/academic-notice";
// Rodape global exibido no fim de todas as paginas.
import { Footer } from "./components/footer/footer";
// Estilos globais compartilhados por toda a aplicacao.
import "./globals.css";

// Configuracao da fonte principal usada nos textos gerais da interface.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configuracao da fonte monoespacada disponivel para trechos que precisem dela.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados padrao da aplicacao, herdados pelas rotas quando nao ha sobrescrita local.
export const metadata: Metadata = {
  title: "App Router Playground - Next.js 16",
  description: "Aplicacao academica para demonstrar App Router, cache, revalidate e route groups no Next.js 16.",
  applicationName: "App Router Playground",
  keywords: [
    "next.js 16",
    "app router",
    "react server components",
    "client components",
    "cache revalidation",
    "revalidateTag",
    "route groups",
    "typescript",
    "estudo nextjs",
    "arquitetura web",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "App Router Playground - Next.js 16",
    description:
      "Projeto de estudos com App Router, cache observability, invalidacao manual e separacao de rotas por grupos.",
    siteName: "App Router Playground",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://nextjs.org/api/og?title=App%20Router%20Playground",
        width: 1200,
        height: 630,
        alt: "Banner Open Graph do App Router Playground",
      },
      {
        url: "https://nextjs.org/static/blog/next-13/twitter-card.png",
        width: 1200,
        height: 630,
        alt: "Imagem Next.js App Router",
      },
      {
        url: "https://opengraph.githubassets.com/1/vercel/next.js",
        width: 1200,
        height: 630,
        alt: "Repositorio oficial do Next.js no GitHub",
      },
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg",
        alt: "Logo do Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "App Router Playground - Next.js 16",
    description:
      "Aplicacao academica com rotas App Router, cache e revalidacao manual no Next.js 16.",
    images: ["https://nextjs.org/api/og?title=App%20Router%20Playground"],
  },
};

// Layout raiz que envolve todas as paginas da pasta app/.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Elemento raiz do documento HTML controlado pelo App Router.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Body global com estrutura vertical para conteudo principal e rodape. */}
      <body className="min-h-full flex flex-col">
        {/* Menu global para navegar entre as principais areas e grupos da aplicacao. */}
        <GlobalNav />

        {/* Aviso educacional fixo no layout para contextualizar o objetivo do projeto. */}
        <AcademicNotice />

        {/* Main recebe a pagina atual renderizada pela rota ativa. */}
        <main className="flex flex-1 flex-col">{children}</main>

        {/* Rodape compartilhado entre todas as paginas da aplicacao. */}
        <Footer />
      </body>
    </html>
  );
}
