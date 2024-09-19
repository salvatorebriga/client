<template>
  <div
    v-if="isAvailable"
    class="rounded-lg cursor-pointer mb-10 relative overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
    @click="showApartmentDetails(id)"
  >
    <img :src="imageUrl" :alt="title" class="h-72 w-full rounded-lg mb-4" />
    <p class="font-bold text-lg mb-2">{{ title }}</p>
    <p class="text-gray-600 dark:text-gray-400 mb-2">{{ address }}</p>
    <p class="font-medium mb-2">Host: {{ host }}</p>
    <div class="flex gap-3">
      <p class="text-sm mb-2">Rooms: {{ rooms }}</p>
      <p class="text-sm mb-2">Beds: {{ beds }}</p>
    </div>
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
    id: {
      type: Number,
      required: true,
    },
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
  methods: {
    showApartmentDetails(id) {
      this.$router.push({ name: "details-apartment", params: { id } });
    },
  },
};
</script>
