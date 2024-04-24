// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        dashboard: 'dashboard.html',
        createClient: 'createClient.html',
        searchClient: 'searchClient.html'
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
});
