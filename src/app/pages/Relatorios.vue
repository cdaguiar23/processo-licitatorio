<template>
  <div class="space-y-6">
    <h1>Relatórios</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Relatório de Licitações -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Licitações</h3>
          <span class="text-sm text-gray-500">Últimos 30 dias</span>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Total de Licitações</span>
            <span class="font-semibold">{{ stats.totalLicitacoes }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Em Andamento</span>
            <span class="text-blue-600 font-semibold">{{ stats.licitacoesAndamento }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Concluídas</span>
            <span class="text-green-600 font-semibold">{{ stats.licitacoesConcluidas }}</span>
          </div>
        </div>
        <button class="btn btn-primary w-full mt-4">Gerar Relatório Detalhado</button>
      </div>

      <!-- Relatório de Fornecedores -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Fornecedores</h3>
          <span class="text-sm text-gray-500">Status Atual</span>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Total de Fornecedores</span>
            <span class="font-semibold">{{ stats.totalFornecedores }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Ativos</span>
            <span class="text-green-600 font-semibold">{{ stats.fornecedoresAtivos }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Inativos</span>
            <span class="text-red-600 font-semibold">{{ stats.fornecedoresInativos }}</span>
          </div>
        </div>
        <button class="btn btn-primary w-full mt-4">Gerar Relatório Detalhado</button>
      </div>

      <!-- Relatório Financeiro -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Financeiro</h3>
          <span class="text-sm text-gray-500">Este Ano</span>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Valor Total</span>
            <span class="font-semibold">{{ formatCurrency(stats.valorTotal) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Maior Licitação</span>
            <span class="text-blue-600 font-semibold">{{ formatCurrency(stats.maiorLicitacao) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Média por Licitação</span>
            <span class="text-gray-800 font-semibold">{{ formatCurrency(stats.mediaLicitacao) }}</span>
          </div>
        </div>
        <button class="btn btn-primary w-full mt-4">Gerar Relatório Detalhado</button>
      </div>
    </div>

    <!-- Gráficos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Licitações por Mês</h3>
        <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
          <!-- Placeholder para gráfico -->
          <span class="text-gray-500">Gráfico de Licitações por Mês</span>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold mb-4">Distribuição por Categoria</h3>
        <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
          <!-- Placeholder para gráfico -->
          <span class="text-gray-500">Gráfico de Distribuição por Categoria</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Mock data - replace with actual API calls
const stats = ref({
  totalLicitacoes: 45,
  licitacoesAndamento: 12,
  licitacoesConcluidas: 33,
  totalFornecedores: 128,
  fornecedoresAtivos: 98,
  fornecedoresInativos: 30,
  valorTotal: 1500000,
  maiorLicitacao: 250000,
  mediaLicitacao: 33333.33
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}
</script>
