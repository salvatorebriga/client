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
        console.log(this.apartments);
      } catch (error) {
        console.error("Error fetching apartments:", error);
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
