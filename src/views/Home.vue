<template>
  <main>
    <div class="dark:text-white p-3 py-10">
      <div
        class="gap-5 p-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <ApartmentCard
          :title="apartment.title"
          :img="apartment.img"
          :host="`${apartment.user.name} ${apartment.user.surname}`"
          :isAvailable="apartment.is_available"
          v-for="apartment in sponsoredApartments"
          :key="apartment.id"
          @click="showApartmentDetails(apartment.id)"
        />
      </div>
      <h2 class="py-6 p-3 font-bold text-2xl">Scelti per te</h2>
      <div
        class="p-3 gap-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        <ApartmentCard
          :title="apartment.title"
          :img="apartment.img"
          :host="`${apartment.user.name} ${apartment.user.surname}`"
          :isAvailable="apartment.is_available"
          v-for="apartment in normalApartments"
          :key="apartment.id"
          @click="showApartmentDetails(apartment.id)"
        />
      </div>
    </div>
  </main>
</template>

<script>
import axios from "../axios";
import ApartmentCard from "../components/ApartmentCard.vue";

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
  components: {
    ApartmentCard,
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
    showApartmentDetails(id) {
      this.$router.push({ name: "DetailsApartment", params: { id } });
    },
  },
};
</script>
