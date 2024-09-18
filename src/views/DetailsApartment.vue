<template>
  <main class="pt-10 rounded-lg px-3 dark:bg-gray-900 dark:text-white">
    <h1 class="text-2xl font-bold mb-4">{{ apartment.title }}</h1>
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex gap-6">
      <!-- Immagine a Sinistra -->
      <div class="flex-shrink-0 w-1/3">
        <img
          :src="imageUrl"
          alt="Apartment Image"
          class="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <!-- Descrizione a Destra -->
      <div class="w-2/3">
        <p class="text-lg mb-2">
          <strong>Address:</strong> {{ apartment.address }}
        </p>
        <p class="text-lg mb-2"><strong>Host:</strong> {{ apartment.host }}</p>
        <p class="text-lg mb-2">
          <strong>Rooms:</strong> {{ apartment.rooms }}
        </p>
        <p class="text-lg mb-2"><strong>Beds:</strong> {{ apartment.beds }}</p>
        <p class="text-lg mb-2">
          <strong>Available:</strong> {{ apartment.isAvailable ? "Yes" : "No" }}
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "../axios";

export default {
  name: "DetailsApartment",
  data() {
    return {
      apartment: {},
    };
  },
  computed: {
    imageUrl() {
      return `http://127.0.0.1:8000/storage/${this.apartment.img}`;
    },
  },
  async created() {
    this.fetchApartment();
  },
  methods: {
    async fetchApartment() {
      try {
        const response = await axios.get(
          `/apartments/${this.$route.params.id}`
        );
        this.apartment = response.data;
      } catch (error) {
        console.error("Error fetching apartment:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Custom styles for image and text alignment */
</style>
