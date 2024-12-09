<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1>Fornecedores</h1>
      <button class="btn btn-primary flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        <span>Novo Fornecedor</span>
      </button>
    </div>

    <div class="card">
      <div class="flex gap-4 mb-4">
        <input type="text" placeholder="Buscar fornecedores..." class="input flex-1" v-model="searchQuery" />
        <select class="input w-48" v-model="filterStatus">
          <option value="">Todos os Status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CNPJ</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Licitação</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="fornecedor in filteredFornecedores" :key="fornecedor.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ fornecedor.nome }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ fornecedor.cnpj }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="statusClass(fornecedor.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ fornecedor.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ fornecedor.ultimaLicitacao }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button class="text-blue-600 hover:text-blue-900 mr-3">Editar</button>
                <button class="text-red-600 hover:text-red-900">Remover</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Mostrando <span class="font-medium">1</span> a <span class="font-medium">10</span> de <span class="font-medium">20</span> resultados
        </div>
        <div class="flex space-x-2">
          <button class="btn btn-secondary">Anterior</button>
          <button class="btn btn-secondary">Próximo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('')

// Mock data - replace with actual API calls
const fornecedores = ref([
  {
    id: 1,
    nome: 'Empresa ABC Ltda',
    cnpj: '12.345.678/0001-90',
    status: 'ativo',
    ultimaLicitacao: '2024-01-15',
  },
  {
    id: 2,
    nome: 'Comercial XYZ S.A.',
    cnpj: '98.765.432/0001-10',
    status: 'inativo',
    ultimaLicitacao: '2023-12-20',
  },
  // Add more mock data as needed
])

const filteredFornecedores = computed(() => {
  return fornecedores.value.filter(f => {
    const matchesSearch = f.nome.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         f.cnpj.includes(searchQuery.value)
    const matchesStatus = !filterStatus.value || f.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const statusClass = (status: string) => {
  return {
    'ativo': 'bg-green-100 text-green-800',
    'inativo': 'bg-red-100 text-red-800',
  }[status] || 'bg-gray-100 text-gray-800'
}
</script>
