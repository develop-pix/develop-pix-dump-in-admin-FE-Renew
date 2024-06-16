import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://dump-in-admin-server.onrender.com/',
        changeOrigin: true,
      },
    },
  },
  define: {
    global: {},
  },
});
