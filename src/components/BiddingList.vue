<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Licitações</h2>
      <router-link
        to="/licitacoes/nova"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Nova Licitação
      </router-link>
    </div>

    <div class="grid gap-4">
      <div
        v-for="bidding in biddingStore.biddings"
        :key="bidding.id"
        class="bg-white shadow rounded-lg p-4"
      >
        <h3 class="text-xl font-semibold">{{ bidding.title }}</h3>
        <p class="text-gray-600">Número: {{ bidding.number }}/{{ bidding.year }}</p>
        <p class="text-gray-600">
          Abertura: {{ formatDate(bidding.openingDate) }}
        </p>
        <StatusBadge :status="bidding.status" />
        <div class="mt-4">
          <router-link
            :to="`/licitacoes/${bidding.id}`"
            class="text-blue-500 hover:text-blue-700"
          >
            Ver Detalhes
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBiddingStore } from '../stores/bidding';
import StatusBadge from './StatusBadge.vue';
import { formatDate } from '../utils/date';

const biddingStore = useBiddingStore();
</script>