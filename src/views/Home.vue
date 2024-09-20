<template>
  <main>
    <div
      class="dark:text-white py-10 px-6 transition-all duration-300 3xl:px-20"
    >
      <div
        class="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 transition-all duration-300"
      >
        <ApartmentCard
          v-for="apartment in sponsoredApartments"
          @click="showApartmentDetails(apartment.id)"
          :title="apartment.title"
          :img="apartment.img"
          :host="`${apartment.user.name} ${apartment.user.surname}`"
          :isAvailable="apartment.is_available"
          :key="apartment.id"
        />
      </div>
      <h2
        class="pt-6 pb-12 font-bold text-2xl sm:text-4xl transition-all duration-300"
      >
        Selected for you
      </h2>
      <div
        class="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 transition-all duration-300"
      >
        <ApartmentCard
          v-for="apartment in normalApartments"
          @click="showApartmentDetails(apartment.id)"
          :title="apartment.title"
          :img="apartment.img"
          :host="`${apartment.user.name} ${apartment.user.surname}`"
          :isAvailable="apartment.is_available"
          :key="apartment.id"
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
    async showApartmentDetails(id) {
      try {
        // Registra la visualizzazione tramite API
        await axios.post(`/apartments/${id}`);

        // Vai ai dettagli dell'appartamento
        this.$router.push({ name: "details-apartment", params: { id } });
      } catch (error) {
        console.error("Error registering view:", error);
      }
    },
  },
};
</script>
