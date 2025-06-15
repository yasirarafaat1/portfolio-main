import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Use absolute URL for production, relative for development
  base: mode === 'production' ? '/' : '/',
  
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  
  preview: {
    port: 3000,
    strictPort: true,
  },
  
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1600,
    
    // Ensure proper chunking for better caching
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor_react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor_radix';
            }
            return 'vendor';
          }
        },
        // Ensure proper file names for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
}));
