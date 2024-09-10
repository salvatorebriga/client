<script>
import axios from "../axios";

export default {
  data() {
    return {
      apartments: [],
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
  <div class="py-20 px-24 container-full mx-auto">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
    >
      <div
        v-for="apartment in apartments"
        :key="apartment.id"
        class="bg-inherit rounded-lg overflow-hidden"
      >
        <img
          src="https://images1.apartments.com/i2/mWiO3cfNJl4j2fiV6NrgaQdRQ99Zz10uknoBHKFPHlM/117/the-everett-gahanna-gahanna-oh-building-photo.jpg?p=1"
          alt="Apartment Image"
          class="w-full h-72 object-cover rounded-lg"
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
