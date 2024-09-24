<template>
  <div
    v-if="isAvailable"
    class="relative overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
  >
    <img
      class="w-full h-80 object-cover rounded-lg mb-1"
      :src="imageUrl"
      :alt="title"
    />
    <div class="p-2 dark:text-white">
      <h2 class="font-bold text-xl mb-1">{{ title }}</h2>
      <p class="mb-1">Host: {{ host }}</p>
      <p class="mb-1">{{ address }}</p>
    </div>
    <div v-if="isSponsored == 1" class="absolute top-2 left-2">
      <i class="fas fa-star text-2xl" style=""></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ApartmentCard',
    props: {
      title: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
      host: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      isAvailable: {
        type: Number,
        required: true,
      },
      isSponsored: {
        type: Number,
      },
    },
    computed: {
      imageUrl() {
        return `http://127.0.0.1:8000/storage/${this.img}`
      },
    },
  }
</script>
