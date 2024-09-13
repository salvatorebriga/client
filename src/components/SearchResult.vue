<template>
  <div class="search-results">
    <h1 class="text-4xl font-bold text-center mb-6">Trova il tuo appartamento ideale</h1>

    <!-- Barra di ricerca -->
    <div class="search-bar mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">
        <input v-model="filters.address" type="text" placeholder="Dove vuoi andare?"
          class="text-base text-gray-700 px-4 py-2 rounded-lg border border-gray-300 flex-grow sm:w-64" />
        <button @click="searchApartments"
          class="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 mt-2 lg:mt-0 sm:w-auto">
          Cerca
        </button>
      </div>
    </div>

    <!-- Toggle per i filtri -->
    <div class="text-center mb-6">
      <button @click="toggleFilters" class="bg-indigo-500 text-white rounded-lg px-4 py-2">
        <span v-if="showFilters">Nascondi Filtri</span>
        <span v-else>Mostra Filtri</span>
      </button>
    </div>

    <!-- Filtri avanzati -->
    <transition name="fade">
      <div v-if="showFilters" class="filters mb-6 p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Filtri</h2>
        <div class="filter-group mb-4">
          <label for="rooms" class="block text-sm font-medium mb-2">Numero minimo di stanze:</label>
          <input id="rooms" v-model="filters.minRooms" type="number" min="0"
            class="text-base text-gray-700 px-4 py-2 rounded-lg border border-gray-300 w-full" />
        </div>
        <div class="filter-group mb-4">
          <label for="beds" class="block text-sm font-medium mb-2">Numero minimo di letti:</label>
          <input id="beds" v-model="filters.minBeds" type="number" min="0"
            class="text-base text-gray-700 px-4 py-2 rounded-lg border border-gray-300 w-full" />
        </div>
        <div class="filter-group mb-4">
          <label for="radius" class="block text-sm font-medium mb-2">Raggio di ricerca (km):</label>
          <input id="radius" v-model.number="filters.radius" type="number" min="1"
            class="text-base text-gray-700 px-4 py-2 rounded-lg border border-gray-300 w-full" />
        </div>
        <div class="filter-group">
          <label class="block text-sm font-medium mb-2">Servizi:</label>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input type="checkbox" value="wifi" v-model="filters.services" class="mr-2" />
              WiFi
            </label>
            <label class="flex items-center">
              <input type="checkbox" value="parking" v-model="filters.services" class="mr-2" />
              Posto Macchina
            </label>
            <label class="flex items-center">
              <input type="checkbox" value="pool" v-model="filters.services" class="mr-2" />
              Piscina
            </label>
            <label class="flex items-center">
              <input type="checkbox" value="concierge" v-model="filters.services" class="mr-2" />
              Portineria
            </label>
            <label class="flex items-center">
              <input type="checkbox" value="sauna" v-model="filters.services" class="mr-2" />
              Sauna
            </label>
            <label class="flex items-center">
              <input type="checkbox" value="seaview" v-model="filters.services" class="mr-2" />
              Vista Mare
            </label>
          </div>
        </div>
      </div>
    </transition>

    <!-- Risultati della ricerca -->
    <div v-if="loading" class="loading text-center text-lg font-medium">Caricamento...</div>
    <div v-else>
      <div v-if="apartments.length === 0" class="no-results text-center text-lg font-medium">Nessun appartamento
        trovato.</div>
      <div class="results-grid">
        <div v-for="apartment in apartments" :key="apartment.id" class="apartment-card">
          <img :src="`/storage/${apartment.img}`" alt="Immagine appartamento" class="apartment-img" />
          <div class="apartment-info p-4">
            <h3 class="text-lg font-semibold mb-2">{{ apartment.title }}</h3>
            <p class="mb-1">{{ apartment.address }}</p>
            <p class="mb-1">Stanze: {{ apartment.rooms }}</p>
            <p class="mb-1">Letti: {{ apartment.beds }}</p>
            <p class="mb-1">Bagni: {{ apartment.bathrooms }}</p>
            <p class="mb-1">Metri quadrati: {{ apartment.mq }}</p>
            <p v-if="apartment.is_available" class="available text-green-500 font-semibold">Disponibile</p>
            <p v-if="apartment.is_sponsored" class="sponsored text-orange-500 font-semibold">Sponsorizzato</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filters: {
        address: '',
        minRooms: '',
        minBeds: '',
        radius: 20, // Raggio di default
        services: []
      },
      apartments: [],
      loading: false,
      showFilters: false, // Stato per mostrare/nascondere i filtri
    };
  },
  methods: {
    async searchApartments() {
      this.loading = true;
      try {
        const response = await axios.get('/api/search', {
          params: {
            address: this.filters.address,
            minRooms: this.filters.minRooms,
            minBeds: this.filters.minBeds,
            radius: this.filters.radius,
            services: this.filters.services
          }
        });
        this.apartments = response.data;
      } catch (error) {
        console.error('Errore nella ricerca degli appartamenti:', error);
      } finally {
        this.loading = false;
      }
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    }
  }
};
</script>

<style scoped>
.search-results {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

.search-bar {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.search-bar input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-bar button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filters {
  transition: max-height 0.3s ease-out;
}

.filters-enter-active,
.filters-leave-active {
  transition: opacity 0.5s;
}

.filters-enter,
.filters-leave-to

/* .filters-leave-active in <2.1.8 */
  {
  opacity: 0;
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group label {
  display: block;
  margin-bottom: 5px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.apartment-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.apartment-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.apartment-info {
  padding: 15px;
}

.available {
  color: green;
  font-weight: bold;
}

.sponsored {
  color: orange;
  font-weight: bold;
}

.loading,
.no-results {
  text-align: center;
  margin-top: 20px;
}
</style>
