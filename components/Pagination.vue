<template>
    <div class="flex justify-center mt-4">
      <button
        class="px-4 py-2 mr-2 bg-gray-300 rounded"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage }} / {{ totalPages }}</span>
      <button
        class="px-4 py-2 ml-2 bg-gray-300 rounded"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
  });
  
  const emit = defineEmits(['page-changed']);
  
  const currentPage = ref(1);
  
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      emit('page-changed', currentPage.value);
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      emit('page-changed', currentPage.value);
    }
  };
  
  watch(currentPage, (newPage) => {
    emit('page-changed', newPage);
  });
  </script>
  