<template>
  <div class="container py-10 mx-auto">
    <!-- Sezione Benvenuto -->
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold mb-4">Welcome to Boolbnb</h1>
      <p class="text-lg">
        Find your perfect stay from our collection of amazing apartments.
      </p>
    </div>

    <!-- Sezione Appartamenti Sponsorizzati -->
    <h2 class="font-semibold text-xl mb-6">Sponsored Apartments</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10"
    >
      <ApartmentCard
        v-for="apartment in sponsoredApartments"
        :key="apartment.id"
        :apartment="apartment"
      />
    </div>

    <!-- Sezione Appartamenti Normali -->
    <h2 class="font-semibold text-xl mb-6">Normal Apartments</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <ApartmentCard
        v-for="apartment in normalApartments"
        :key="apartment.id"
        :apartment="apartment"
      />
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import ApartmentCard from "../components/ApartmentCard.vue";

export default {
  components: {
    ApartmentCard,
  },
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

<style lang="scss" scoped>
/* Stili per la Home page */
</style>
