import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/', // Ensure base path is set correctly
  publicDir: 'public', // Explicitly set public directory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
        assetFileNames: (assetInfo) => {
          // Keep original file names for assets
          if (assetInfo.name) {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1].toLowerCase();
            if (['png', 'jpeg', 'jpg', 'gif', 'svg'].includes(ext)) {
              return `assets/images/[name][extname]`;
            }
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  define: {
    'process.env': {}
  },
});
