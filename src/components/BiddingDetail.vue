<template>
  <div class="container mx-auto p-4" v-if="bidding">
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-6">{{ bidding.title }}</h2>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p class="font-semibold">Número:</p>
          <p>{{ bidding.number }}/{{ bidding.year }}</p>
        </div>

        <div>
          <p class="font-semibold">Status:</p>
          <StatusBadge :status="bidding.status" />
        </div>

        <div>
          <p class="font-semibold">Data de Abertura:</p>
          <p>{{ formatDate(bidding.openingDate) }}</p>
        </div>

        <div>
          <p class="font-semibold">Data de Encerramento:</p>
          <p>{{ formatDate(bidding.closingDate) }}</p>
        </div>

        <div>
          <p class="font-semibold">Valor Estimado:</p>
          <p>{{ formatCurrency(bidding.estimatedValue) }}</p>
        </div>

        <div>
          <p class="font-semibold">Tipo:</p>
          <p>{{ BIDDING_TYPES[bidding.type] }}</p>
        </div>
      </div>

      <div class="mb-6">
        <p class="font-semibold mb-2">Descrição:</p>
        <p class="text-gray-700">{{ bidding.description }}</p>
      </div>

      <div class="flex gap-2">
        <button
          @click="onEdit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          @click="onDelete"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBiddingStore } from '../stores/bidding';
import StatusBadge from './StatusBadge.vue';
import { formatDate } from '../utils/date';
import { formatCurrency } from '../utils/currency';
import { BIDDING_TYPES } from '../constants';

const route = useRoute();
const router = useRouter();
const biddingStore = useBiddingStore();

const bidding = computed(() => 
  biddingStore.getBidding(Number(route.params.id))
);

const onEdit = () => {
  router.push(`/licitacoes/${route.params.id}/editar`);
};

const onDelete = async () => {
  if (confirm('Tem certeza que deseja excluir esta licitação?')) {
    biddingStore.deleteBidding(Number(route.params.id));
    router.push('/licitacoes');
  }
};
</script>