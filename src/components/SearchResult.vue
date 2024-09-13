<template>
  <div class="search-results">
    <h1>Trova il tuo appartamento ideale</h1>

    <!-- Barra di ricerca -->
    <div class="search-bar">
      <input v-model="filters.address" type="text" placeholder="Dove vuoi andare?" @keyup.enter="searchApartments" />
      <button @click="searchApartments">Cerca</button>
    </div>

    <!-- Filtri avanzati -->
    <div class="filters">
      <h2>Filtri</h2>
      <div class="filter-group">
        <label for="rooms">Numero minimo di stanze:</label>
        <input id="rooms" v-model="filters.minRooms" type="number" min="0" />
      </div>
      <div class="filter-group">
        <label for="beds">Numero minimo di letti:</label>
        <input id="beds" v-model="filters.minBeds" type="number" min="0" />
      </div>
      <div class="filter-group">
        <label for="radius">Raggio di ricerca (km):</label>
        <input id="radius" v-model.number="filters.radius" type="number" min="1" :value="defaultRadius" />
      </div>
      <div class="filter-group">
        <label>Servizi:</label>
        <div>
          <label><input type="checkbox" value="wifi" v-model="filters.services" /> WiFi</label>
          <label><input type="checkbox" value="parking" v-model="filters.services" /> Posto Macchina</label>
          <label><input type="checkbox" value="pool" v-model="filters.services" /> Piscina</label>
          <label><input type="checkbox" value="concierge" v-model="filters.services" /> Portineria</label>
          <label><input type="checkbox" value="sauna" v-model="filters.services" /> Sauna</label>
          <label><input type="checkbox" value="seaview" v-model="filters.services" /> Vista Mare</label>
        </div>
      </div>
    </div>

    <!-- Risultati della ricerca -->
    <div v-if="loading" class="loading">Caricamento...</div>
    <div v-else>
      <div v-if="apartments.length === 0" class="no-results">Nessun appartamento trovato.</div>
      <div class="results-grid">
        <div v-for="apartment in apartments" :key="apartment.id" class="apartment-card">
          <img :src="`/storage/${apartment.img}`" alt="Immagine appartamento" class="apartment-img" />
          <div class="apartment-info">
            <h3>{{ apartment.title }}</h3>
            <p>{{ apartment.address }}</p>
            <p>Stanze: {{ apartment.rooms }}</p>
            <p>Letti: {{ apartment.beds }}</p>
            <p>Bagni: {{ apartment.bathrooms }}</p>
            <p>Metri quadrati: {{ apartment.mq }}</p>
            <p v-if="apartment.is_available" class="available">Disponibile</p>
            <p v-if="apartment.is_sponsored" class="sponsored">Sponsorizzato</p>
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
      name: 'SearchResultComponent',
      filters: {
        address: '',
        minRooms: '',
        minBeds: '',
        radius: 20, // Raggio di default
        services: []
      },
      apartments: [],
      loading: false,
      defaultRadius: 20
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
  margin-bottom: 20px;
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
  margin-bottom: 20px;
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
