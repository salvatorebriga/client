<script>
import axios from "../axios";

export default {
  data() {
    return {
      apartments: [],
      imgUrl: "http://127.0.0.1:8000/storage/",
    };
  },
  created() {
    this.fetchApartments();
  },
  methods: {
    async fetchApartments() {
      try {
        const response = await axios.get("/apartments");
        this.apartments = response.data;
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    },
  },
};
</script>

<template>
  <div class="container py-6 mx-auto">
    <div
      class="grid xs:grid-cols-1 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      <div
        v-for="apartment in apartments"
        :key="apartment.id"
        class="bg-inherit rounded-lg overflow-hidden"
      >
        <img
          v-if="apartment.img"
          :src="`${imgUrl}${apartment.img}`"
          alt="Apartment Image"
          class="w-full h-60 object-cover rounded-lg"
        />

        <div class="p-1">
          <p class="font-semibold mt-2">{{ apartment.title }}</p>
          <p class="text-gray-600 mt-1">
            Host: {{ apartment.user.name }} {{ apartment.user.surname }}
          </p>
          <p class="mb-4 mt-1">
            {{ apartment.is_available ? "Available" : "Not available" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
