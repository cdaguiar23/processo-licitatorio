<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <router-link to="/" class="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clip-rule="evenodd" />
            </svg>
            <span class="text-xl font-bold text-gray-800">Sistema de Licitações</span>
          </router-link>
          
          <div class="flex items-center space-x-4">
            <router-link to="/licitacoes" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Licitações
            </router-link>
            <router-link to="/licitacoes/dfd" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Documento de Formalização de Demanda
            </router-link>
            <router-link to="/licitacoes/autorizacao-presidente" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Autorização do Presidente
            </router-link>
            <router-link to="/fornecedores" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Fornecedores
            </router-link>
            <router-link to="/relatorios" class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
              Relatórios
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>

    <footer class="bg-white shadow-lg mt-auto">
      <div class="container mx-auto px-4 py-4">
        <p class="text-center text-gray-600 text-sm">
          2024 Sistema de Licitações. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Component logic here if needed
</script>

<style>
@import './global_styles.css';
</style>