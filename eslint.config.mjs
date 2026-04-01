// Helpers de configuracao do ESLint no formato flat config.
import { defineConfig, globalIgnores } from "eslint/config";
// Regras recomendadas do Next focadas em Core Web Vitals.
import nextVitals from "eslint-config-next/core-web-vitals";
// Regras adicionais de TypeScript para projetos Next.
import nextTs from "eslint-config-next/typescript";

// Configuracao final do lint aplicada ao projeto.
const eslintConfig = defineConfig([
  // Conjunto base de regras recomendadas pelo Next.
  ...nextVitals,
  ...nextTs,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

// Exporta a configuracao para uso pelo comando eslint.
export default eslintConfig;
