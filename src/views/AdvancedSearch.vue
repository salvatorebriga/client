<template>
  <main class="py-10 rounded-lg px-3">
    <div
      class="container mx-auto bg-white dark:text-white shadow dark:bg-gray-950 rounded-lg pt-6 pb-6 transition-all duration-300"
    >
      <!-- Search title -->
      <div class="px-6 py-2">
        <h2 class="font-bold text-2xl">Search Results</h2>
        <p class="text-lg">
          You searched for:
          <span class="font-semibold">{{ searchQuery }}</span> with a radius of
          <span class="font-semibold">{{ searchRadius }} km</span>
        </p>
      </div>

      <!-- Section for search filters -->
      <div class="px-6 py-4">
        <div class="flex flex-col md:flex-row gap-0 md:gap-2">
          <!-- Address filter -->
          <div class="flex-1">
            <label
              for="query"
              class="block text-sm font-medium text-gray-700 dark:text-white transition-all duration-300 mb-2"
              >Address</label
            >
            <div class="relative w-full">
              <input
                v-model="searchQuery"
                @input="debouncedGetAutocomplete"
                type="text"
                id="query"
                class="block border border-gray-300 rounded-t md:rounded-l md:rounded-tr-none p-2 w-full mb-2 text-black dark:bg-gray-900 dark:border-none dark:text-white focus:outline-none transition-all duration-300"
                placeholder="Address"
              />
              <ul
                v-if="searchResults.length > 0"
                id="searchResults"
                class="absolute w-full bg-white mt-1 rounded-lg shadow-lg overflow-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 z-20 transition-all duration-300"
              >
                <li
                  v-for="(result, index) in searchResults"
                  :key="index"
                  @click="selectResult(result)"
                  class="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-indigo-600 z-20 transition-all duration-300"
                >
                  {{ result.address.freeformAddress }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Radius filter -->
          <div class="flex-1">
            <label
              for="radius"
              class="block text-sm font-medium text-gray-700 dark:text-white transition-all duration-300 mb-2"
              >Radius (km)</label
            >
            <input
              v-model="searchRadius"
              type="number"
              id="radius"
              class="border border-gray-300 rounded-none p-2 w-full mb-2 text-black dark:bg-gray-900 dark:border-none dark:text-white focus:outline-none transition-all duration-300"
              placeholder="Distance in km"
            />
          </div>

          <!-- Minimum rooms filter -->
          <div class="flex-1">
            <label
              for="minRooms"
              class="block text-sm font-medium text-gray-700 dark:text-white transition-all duration-300 mb-2"
              >Minimum Rooms</label
            >
            <input
              v-model="minRooms"
              type="number"
              id="minRooms"
              class="border border-gray-300 rounded-none p-2 w-full mb-2 text-black dark:bg-gray-900 dark:border-none dark:text-white focus:outline-none transition-all duration-300"
              placeholder="Minimum number of rooms"
            />
          </div>

          <!-- Services filter with dropdown -->
          <div class="relative flex-1">
            <label
              for="servicesDropdown"
              class="block text-sm font-medium text-gray-700 dark:text-white transition-all duration-300 mb-2"
              >Services</label
            >
            <button
              id="servicesDropdown"
              @click="toggleDropdown"
              class="transition-all duration-300 border border-gray-300 rounded-b md:rounded-r md:rounded-bl-none p-2 w-full text-left flex items-center justify-between dark:border-none dark:bg-gray-900 dark:text-white"
            >
              Select Services
              <span class="ml-2">&#9662;</span>
            </button>

            <!-- Dropdown menu -->
            <div
              v-if="dropdownOpen"
              class="transition-all duration-300 absolute z-10 bg-white border dark:bg-gray-900 dark:border-gray-800 rounded-md shadow-lg mt-2 p-4 w-full"
            >
              <div
                v-for="service in availableServices"
                :key="service.id"
                class="flex items-center mb-2"
              >
                <input
                  type="checkbox"
                  :value="service.name"
                  v-model="selectedServices"
                  class="mr-2"
                />
                <label>{{ service.name }}</label>
              </div>
              <!-- Button to close dropdown -->
              <button
                @click="toggleDropdown"
                class="transition-all duration-300 mt-2 bg-airbnbcolor hover:bg-airbnbcolorhover dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

        <!-- Button to update search -->
        <button
          @click="fetchResults"
          class="transition-all duration-300 bg-airbnbcolor hover:bg-airbnbcolorhover dark:bg-indigo-600 hover:dark:bg-indigo-700 text-white px-4 py-2 rounded mt-4"
        >
          Update Search
        </button>
      </div>

      <hr
        class="transition-all duration-300 p-0 border border-gray-200 dark:border-gray-950"
      />

      <!-- Page body -->
      <div class="px-6 pt-4">
        <!-- Loading message -->
        <div
          v-if="loading"
          class="transition-all duration-300 text-gray-500 mt-6"
        >
          Loading...
        </div>

        <!-- Display search results -->
        <div
          v-else-if="results && results.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4"
        >
          <AdvancedCard
            v-for="apartment in results"
            :key="apartment.id"
            :img="apartment.img"
            :title="apartment.title"
            :address="apartment.address"
            :host="`${apartment.user.name} ${apartment.user.surname}`"
            :rooms="apartment.rooms"
            :beds="apartment.beds"
            :isAvailable="apartment.is_available"
            :id="apartment.id"
          />
        </div>

        <!-- No results message -->
        <div
          v-else-if="!loading && results.length === 0"
          class="transition-all duration-300 text-red-500 mt-6"
        >
          No results found
        </div>

        <!-- Error message -->
        <div v-if="error" class="transition-all duration-300 text-red-500 mt-6">
          An error occurred during the search: {{ error }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import axios from '../axios'
  import AdvancedCard from '../components/AdvancedCard.vue'
  import { useDebounceFn } from '@vueuse/core'

  export default {
    name: 'AdvancedSearch',
    components: {
      AdvancedCard,
    },
    data() {
      return {
        dropdownOpen: false,
        searchQuery: this.$route.query.query || '',
        searchRadius: this.$route.query.radius || 20,
        minRooms: this.$route.query.min_rooms || 1,
        selectedServices: [],
        availableServices: [],
        results: [],
        error: null,
        loading: true,
        searchResults: [],
        selected: false,
      }
    },
    created() {
      this.fetchAvailableServices()
      this.fetchResults()
      this.debouncedGetAutocomplete = useDebounceFn(this.getAutocomplete, 400) // Usa useDebounceFn di VueUse
    },
    watch: {
      searchQuery(newQuery) {
        this.fetchResults()
      },
      searchRadius(newRadius) {
        this.fetchResults()
      },
      minRooms(newMinRooms) {
        this.fetchResults()
      },
      selectedServices(newServices) {
        this.fetchResults()
      },
    },
    methods: {
      async fetchResults() {
        this.error = null
        this.results = []
        this.loading = true

        if (this.searchQuery) {
          try {
            let query = `/search?query=${encodeURIComponent(
              this.searchQuery
            )}&radius=${this.searchRadius}&min_rooms=${this.minRooms}`

            if (this.selectedServices.length > 0) {
              query += `&services[]=${this.selectedServices.join(
                '&services[]='
              )}`
            }

            const response = await axios.get(query)
            this.results = response.data
          } catch (error) {
            this.error =
              'An error occurred during the search. Please try again later.'
          } finally {
            this.loading = false
          }
        } else {
          this.loading = false
        }
      },

      async fetchAvailableServices() {
        try {
          const response = await axios.get('/search/services')
          this.availableServices = response.data
        } catch (error) {
          this.error = 'Unable to load available services.'
        }
      },

      toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen
      },

      getAutocomplete() {
        if (this.searchQuery.length < 4) {
          this.searchResults = []
          return
        }
        this.selected = false
        axios
          .get(`/autocomplete`, { params: { query: this.searchQuery } })
          .then((response) => {
            this.searchResults = response.data
          })
          .catch((error) => {
            console.error('Error:', error)
            this.searchResults = []
          })
      },

      selectResult(result) {
        this.searchQuery = result.address.freeformAddress
        this.searchResults = []
        this.selected = true
      },
    },
  }
</script>
