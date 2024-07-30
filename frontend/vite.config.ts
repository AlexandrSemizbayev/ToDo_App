import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compressPlugin from 'vite-plugin-compression';
import obfuscator from 'rollup-plugin-obfuscator';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: { // local development proxy
      '/request': {
        target: 'http://127.0.0.1:8000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/request/, ''),
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [
    react(),
    compressPlugin({
      ext: '.gz',
      deleteOriginFile: false,
    }),
  ],
  // treeshake: 'smallest',
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/')
            : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        },
        plugins: [
          obfuscator({}),
        ],
      },
    },
  }
})
