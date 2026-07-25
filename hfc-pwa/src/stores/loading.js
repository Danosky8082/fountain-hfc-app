import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
  const isLoading = ref(false);
  const setLoading = (val) => { isLoading.value = val; };
  return { isLoading, setLoading };
});