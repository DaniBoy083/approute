import type { NextConfig } from "next";

// Configuracao global do Next usada neste projeto.
const nextConfig: NextConfig = {
  // Libera imagens remotas vindas do host de avatares do GitHub.
  images: {
    remotePatterns: [new URL('https://avatars.githubusercontent.com/**')],
  },
};

// Exporta a configuracao para o runtime do Next.
export default nextConfig;
