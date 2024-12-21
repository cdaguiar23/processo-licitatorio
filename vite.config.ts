import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // Permite acesso de outras máquinas
    port: 3000, // Porta padrão (altere se necessário)
  }
});
