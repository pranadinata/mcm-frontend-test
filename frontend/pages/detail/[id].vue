<template>
  <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
    <div class="border-b mb-5 flex justify-between text-sm">
      <div class="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">
        <svg class="h-6 mr-3" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 455.005 455.005"
          style="enable-background:new 0 0 455.005 455.005;" xml:space="preserve">
          <!-- SVG content here -->
        </svg>
        <a href="#" class="font-semibold inline-block">DETAIL Games</a>
      </div>
    </div>

    <!-- Tampilkan pesan loading saat data sedang di-fetch -->
    <div v-if="loading" class="text-center text-gray-500">
      Loading...
    </div>

    <!-- Tampilkan pesan error jika terjadi kesalahan -->
    <div v-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <!-- Tampilkan konten hanya jika item sudah diisi -->
    <div v-if="item" class="">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-wrap -mx-4">
          <!-- Product Images -->
          <div class="w-full md:w-1/2 px-4 mb-8">
            <img :src="item.thumbnail" alt="Product" class="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage">
            <div class="flex gap-4 py-4 justify-center overflow-x-auto">
              <div v-for="images in item.screenshots" :key="images.id">
                <img :src="images.image"
                        class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                        @click="changeImage">
              </div>
              
            </div>
          </div>

          <!-- Product Details -->
          <div class="w-full md:w-1/2 px-4">
            <h2 class="text-3xl font-bold mb-2">{{ item.title }}</h2>
            <a target="_blank" href="#">Release Date : {{ item.release_date }}</a>
            <div class="mb-4">
              <span class="text-2xl font-bold mr-2">{{ item.publisher }}</span>
              <span class="text-gray-500 line-through">{{ item.developer }}</span>
            </div>
            <div class="flex space-x-4 mb-6">
              <button
                class="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {{ item.platform }}
              </button>
              <button
                class="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                {{ item.genre }}
              </button>
            </div>
            <!-- Display the description using v-html -->
            <div class="text-gray-700 mb-6" v-html="item.description"></div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Minimum Requirements :</h3>
              <ul class="list-disc list-inside text-gray-700">
                <li>{{ item.minimum_system_requirements?.os }}</li>
                <li>{{ item.minimum_system_requirements?.processor }}</li>
                <li>{{ item.minimum_system_requirements?.memory }}</li>
                <li>{{ item.minimum_system_requirements?.graphics }}</li>
                <li>{{ item.minimum_system_requirements?.storage }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Mengambil parameter ID dari rute
const route = useRoute();
const id = route.params.id as string;

const item = ref<any>(null);
const loading = ref(true);
const error = ref('');

// Fungsi untuk fetch data item
const fetchItem = async () => {
  try {
    const { data } = await axios.get(`http://127.0.0.1:3001/api/data/${id}`);
    item.value = data;
  } catch (err: any) {
    error.value = 'Error fetching data: ' + err.message;
  } finally {
    loading.value = false;
  }
};

// Fungsi untuk mengganti gambar utama
const changeImage = (event: MouseEvent) => {
  const src = (event.target as HTMLImageElement).src;
  const mainImage = document.getElementById('mainImage') as HTMLImageElement;
  if (mainImage) {
    mainImage.src = src;
  }
};

onMounted(() => {
  fetchItem();
});
</script>
