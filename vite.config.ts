import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/chat': {
        target: 'http://106.55.55.54:8080',
        changeOrigin: true,
      },
    },
  },
});
