import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  // 沿用原版的浏览器编译目标。
  build: { target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'] },
  server: {
    proxy: {
      '/api/chat': {
        target: 'https://ryanflow.cloud',
        changeOrigin: true,
      },
    },
  },
});
