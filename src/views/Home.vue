<template>
  <main></main>
</template>

<script>
import axios from "../axios";

export default {
  data() {
    return {
      apartments: [],
      sponsoredApartments: [],
      normalApartments: [],
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

        // Separare gli appartamenti sponsorizzati da quelli normali
        this.sponsoredApartments = this.apartments.filter(
          (apartment) => apartment.is_sponsored
        );
        this.normalApartments = this.apartments.filter(
          (apartment) => !apartment.is_sponsored
        );

        this.shuffleApartments(this.sponsoredApartments);
        this.shuffleApartments(this.normalApartments);
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    },
    shuffleApartments(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
