<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6">
      {{ isEditing ? 'Editar' : 'Nova' }} Licitação
    </h2>

    <form @submit.prevent="onSubmit" class="max-w-lg">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Número</label>
          <input
            v-model="form.number"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Ano</label>
          <input
            v-model="form.year"
            type="number"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Título</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Descrição</label>
          <textarea
            v-model="form.description"
            rows="4"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Data de Abertura
          </label>
          <input
            v-model="form.openingDate"
            type="datetime-local"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Data de Encerramento
          </label>
          <input
            v-model="form.closingDate"
            type="datetime-local"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Valor Estimado
          </label>
          <input
            v-model="form.estimatedValue"
            type="number"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            v-model="form.type"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pregao">Pregão</option>
            <option value="tomada_preco">Tomada de Preço</option>
            <option value="concorrencia">Concorrência</option>
            <option value="convite">Convite</option>
          </select>
        </div>
      </div>

      <div class="mt-6">
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBiddingStore } from '../stores/bidding';
import type { Bidding } from '../types/bidding';

const route = useRoute();
const router = useRouter();
const biddingStore = useBiddingStore();

const isEditing = ref(false);
const form = ref({
  number: '',
  year: new Date().getFullYear(),
  title: '',
  description: '',
  openingDate: '',
  closingDate: '',
  estimatedValue: 0,
  type: 'pregao' as Bidding['type'],
  status: 'draft' as Bidding['status'],
  documents: [] as string[]
});

onMounted(() => {
  const id = route.params.id;
  if (id) {
    isEditing.value = true;
    const bidding = biddingStore.getBidding(Number(id));
    if (bidding) {
      form.value = { ...bidding };
    }
  }
});

const onSubmit = () => {
  if (isEditing.value) {
    biddingStore.updateBidding(Number(route.params.id), form.value);
  } else {
    biddingStore.addBidding(form.value);
  }
  router.push('/licitacoes');
};
</script>