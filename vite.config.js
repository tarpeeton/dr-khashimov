import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['dr-khashimov.uz'], 
    host: '0.0.0.0',
    port: 2025      
  },
});
