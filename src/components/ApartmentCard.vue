<template>
  <div
    v-if="isAvailable"
    class="relative overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
  >
    <img
      class="w-full h-80 object-cover rounded-lg mb-1 transition-transform duration-300 ease-in-out hover:scale-110"
      :src="imageUrl"
      :alt="title"
    />
    <div class="p-2 dark:text-white">
      <h2 class="font-bold mb-1">{{ title }}</h2>
      <p class="mb-1">Host: {{ host }}</p>
      <p class="mb-1">{{ address }}</p>
    </div>
    <div v-if="isSponsored == 1" class="absolute top-2 right-2">
      <i
        class="fas fa-star text-3xl"
        style="
          filter: brightness(0) saturate(100%) invert(98%) sepia(95%)
            saturate(7493%) hue-rotate(344deg) brightness(95%) contrast(114%);
        "
      ></i>
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
