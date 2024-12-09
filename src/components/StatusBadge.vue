<template>
  <span :class="[baseClasses, statusClasses[status]]">
    {{ BIDDING_STATUS[status] }}
  </span>
</template>

<script setup lang="ts">
import type { Bidding } from '../types/bidding';
import { BIDDING_STATUS } from '../constants';

const props = defineProps<{
  status: Bidding['status'];
}>();

const baseClasses = 'px-2 py-1 rounded-full text-sm font-medium';

const statusClasses = {
  draft: 'bg-gray-100 text-gray-800',
  published: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};</script>