import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    base: '/e-commerc-projects/',
  plugins: [react()],
  resolve: {
    alias: {
      // ESM icon paths export components directly (avoids { default: Icon } in dev)
      '@mui/icons-material': path.resolve(
        __dirname,
        'node_modules/@mui/icons-material/esm'
      ),
    },
  },
  optimizeDeps: {
    include: [
      'prop-types',
      '@mui/material',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
});

