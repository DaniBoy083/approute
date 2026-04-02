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
