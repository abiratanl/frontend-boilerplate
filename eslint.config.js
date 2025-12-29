import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier'; // <--- 1. Import do Prettier

// Usamos tseslint.config no lugar de defineConfig para ter suporte
// à propriedade "extends" e facilitar a mesclagem de configurações.
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // O spread (...) é importante aqui pois é um array
      // Seus plugins de React (assumindo que exportam configurações flat compatíveis)
      // Caso contrário, eles são configurados via plugins/rules abaixo,
      // mas mantive a lógica de extends do seu código original se as libs suportarem.
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    // Configuração manual dos plugins React para garantir que funcionem
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  prettier // <--- 2. Prettier deve ser sempre o último argumento para sobrescrever conflitos
);
