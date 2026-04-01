// Componente de rodape global exibido em todas as paginas.
export function Footer() {
    // Estrutura com creditos e links de contato.
    return (
        // Rodape fixado ao fim do fluxo da pagina pelo layout raiz.
        <footer className="w-full border-t border-white/20 bg-black px-4 py-8 text-center text-white">
            {/* Container central para limitar a largura do conteudo. */}
            <div id="sobre" className="mx-auto w-full max-w-6xl">
                {/* Lista simples com informacoes do autor e canais externos. */}
                <ol className="space-y-2 text-sm sm:text-base">
                    {/* Credito do autor */}
                    <li>Pagina desenvolvida por Daniel Costa Carvalho Martins</li>
                    <li>
                        {/* Link de contato por email */}
                        <a
                            href="mailto:danielcostacarvalhomartins06@gmail.com"
                            className="underline-offset-4 transition hover:underline"
                        >
                            danielcostacarvalhomartins06@gmail.com
                        </a>
                    </li>
                    <li>
                        {/* Link para o portifolio externo do autor. */}
                        <a
                            href="https://devthreebydanielcosta.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-offset-4 transition hover:underline"
                        >
                            Saiba mais
                        </a>
                    </li>
                </ol>
            </div>
        </footer>
    );
}