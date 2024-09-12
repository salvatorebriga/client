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
        this.shuffleApartments();
      } catch (error) {
        console.error("Error fetching apartments:", error);
      }
    },

    async shuffleApartments() {
      for (let i = this.apartments.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.apartments[i], this.apartments[j]] = [
          this.apartments[j],
          this.apartments[i],
        ];
      }
    },
  },
};
</script>

<template>
  <div class="container py-10 mx-auto">
    <div
      class="grid xs:grid-cols-1 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6"
    >
      <ApartmentCard
        v-for="apartment in apartments"
        :key="apartment.id"
        :apartment="apartment"
      />
    </div>
  </div>
</template>
