import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Inicializa o FlatCompat para carregar as configurações no estilo .eslintrc
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname, // Onde procurar pelo package.json
});

export default [
  // 1. Configuração Padrão do ESLint (necessária no v9)
  js.configs.recommended,

  // 2. Aplica as Regras do Airbnb usando o adaptador FlatCompat
  // O método .extends() aqui funciona com o adaptador, não o extends nativo.
  ...compat.extends('airbnb-base'),

  // 3. Configurações Específicas do Projeto
  {
    ignores: ['node_modules/', 'dist/'],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        node: true,
      },
    },

    // Suas regras personalizadas
    rules: {
      'no-console': 'off',
      // Se você está usando CommonJS (require), adicione esta regra:
      'import/no-extraneous-dependencies': 'off',
    },
  },
];
