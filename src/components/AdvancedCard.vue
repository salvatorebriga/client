<template>
  <div class="rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
    <img :src="imageUrl" :alt="title" class="h-60 w-full rounded-lg mb-4" />
    <p class="font-bold text-lg mb-2">{{ title }}</p>
    <p class="text-gray-600 dark:text-gray-400 mb-2">{{ address }}</p>
    <p class="font-medium mb-2">Host: {{ host }}</p>
    <p class="text-sm mb-2">Rooms: {{ rooms }}</p>
    <p class="text-sm mb-2">Beds: {{ beds }}</p>
    <p class="text-sm font-semibold">
      {{ isAvailable ? "Available" : "Not Available" }}
    </p>
  </div>
</template>

<script>
export default {
  computed: {
    imageUrl() {
      return `http://127.0.0.1:8000/storage/${this.img}`;
    },
  },
  props: {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    rooms: {
      type: Number,
      required: true,
    },
    beds: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Number,
      required: true,
    },
  },
};
</script>
