
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// Add the import for lovable-tagger
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(), // Add componentTagger only in development
  ].filter(Boolean),
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@lib': path.resolve(__dirname, './src/lib')
    }
  },
  base: '/', // Explicit base path
  server: {
    port: 8080,
    allowedHosts: [
      '24b99f1a-5229-4600-b01f-5b27c2da57e5.lovableproject.com'
    ]
  }
}));
