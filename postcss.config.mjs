// Configuracao do PostCSS usada pelo pipeline de estilos do projeto.
const config = {
  // Plugin do Tailwind CSS v4 integrado ao PostCSS.
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

// Exporta a configuracao para ser carregada pelo Next durante o build.
export default config;
