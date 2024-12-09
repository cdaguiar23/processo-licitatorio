import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Bidding } from '../types/bidding';

export const useBiddingStore = defineStore('bidding', () => {
  const biddings = ref<Bidding[]>([]);

  function addBidding(bidding: Omit<Bidding, 'id'>) {
    const newBidding = {
      ...bidding,
      id: Math.max(0, ...biddings.value.map(b => b.id)) + 1
    };
    biddings.value.push(newBidding);
    return newBidding;
  }

  function updateBidding(id: number, bidding: Partial<Bidding>) {
    const index = biddings.value.findIndex(b => b.id === id);
    if (index !== -1) {
      biddings.value[index] = { ...biddings.value[index], ...bidding };
      return biddings.value[index];
    }
    return null;
  }

  function deleteBidding(id: number) {
    const index = biddings.value.findIndex(b => b.id === id);
    if (index !== -1) {
      biddings.value.splice(index, 1);
      return true;
    }
    return false;
  }

  function getBidding(id: number) {
    return biddings.value.find(b => b.id === id);
  }

  return {
    biddings,
    addBidding,
    updateBidding,
    deleteBidding,
    getBidding
  };
});