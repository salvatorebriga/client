<template>
  <main class="">
    <div class="container mx-auto transition-all duration-300 py-10">
      <div class="max-w-4xl mx-auto px-4">
        <!-- Immagine dell'appartamento -->
        <div class="mb-8">
          <img
            :src="imageUrl"
            :alt="apartment.title"
            class="w-full max-h-96 object-cover shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <!-- Dettagli appartamento -->
        <div class="text-center">
          <h1 class="text-5xl font-bold text-gray-900 dark:text-gray-100">
            <!-- Cambiato il testo della modalità scura a "text-gray-100" -->
            {{ apartment.title }}
          </h1>
          <p class="text-xl text-gray-600 mt-2 dark:text-gray-400">
            <!-- Cambiato il testo della modalità scura a "text-gray-400" -->
            {{ apartment.address }}
          </p>
          <p class="text-gray-500 dark:text-gray-300">
            <!-- Cambiato il testo della modalità scura a "text-gray-300" -->
            Host name: {{ apartment.user.name }} {{ apartment.user.surname }}
          </p>
        </div>

        <!-- Informazioni appartamento -->
        <div
          class="flex flex-wrap justify-center gap-10 mt-10 text-center text-lg"
        >
          <div class="w-48 p-4 bg-white rounded-xl shadow-md dark:bg-gray-800">
            <!-- Aggiunta modalità scura bg-gray-800 -->
            <h3 class="font-semibold text-gray-700 dark:text-gray-200">
              <!-- Cambiato il testo della modalità scura a "text-gray-200" -->
              Rooms
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              <!-- Cambiato il testo della modalità scura a "text-gray-400" -->
              {{ apartment.rooms }}
            </p>
          </div>
          <div class="w-48 p-4 bg-white rounded-xl shadow-md dark:bg-gray-800">
            <h3 class="font-semibold text-gray-700 dark:text-gray-200">Beds</h3>
            <p class="text-gray-600 dark:text-gray-400">{{ apartment.beds }}</p>
          </div>
          <div class="w-48 p-4 bg-white rounded-xl shadow-md dark:bg-gray-800">
            <h3 class="font-semibold text-gray-700 dark:text-gray-200">
              Bathrooms
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              {{ apartment.bathrooms }}
            </p>
          </div>
        </div>

        <!-- Servizi -->
        <div class="mt-12">
          <h2
            class="text-3xl font-semibold text-gray-800 text-center dark:text-gray-200"
          >
            Services available
          </h2>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 mt-6 px-4 md:px-10"
          >
            <div
              class="flex items-center"
              v-for="(item, index) in apartment.services"
              :key="index"
            >
              <div
                class="bg-blue-100 dark:bg-blue-900 p-4 rounded-full shadow-lg"
              >
                <i
                  :class="item.icon"
                  class="h-6 w-6 text-blue-500 dark:text-blue-400 text-center align-middle leading-normal"
                ></i>
                <!-- <svg
                  class="h-6 w-6 text-blue-500 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  ></path>
                </svg> -->
              </div>
              <p class="ml-3 text-lg text-gray-700 dark:text-gray-300">
                {{ item.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Mappa -->
        <div class="mt-12 text-center">
          <div class="relative">
            <MapTomTom :urlMap="urlMap" />
          </div>
        </div>

        <!-- Pulsante contatto -->
        <div class="mt-10 text-center">
          <button
            id="contactButton"
            class="px-6 py-3 rounded-lg shadow-lg bg-airbnbcolor hover:bg-airbnbcolorhover dark:bg-indigo-600 text-white font-semibold dark:hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
            @click="openModal"
          >
            Contact Host
          </button>
        </div>

        <!-- Modulo contatto (nascosto di default) -->
        <div id="contactForm" class="mt-10 hidden">
          <h2 class="text-2xl font-semibold text-gray-800 text-center">
            Modulo di Contatto
          </h2>
          <form class="mt-6 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Il tuo nome"
              class="w-full p-2 mb-4 border rounded"
            />
            <input
              type="email"
              placeholder="La tua email"
              class="w-full p-2 mb-4 border rounded"
            />
            <textarea
              placeholder="Messaggio"
              class="w-full p-2 mb-4 border rounded"
              rows="4"
            ></textarea>
            <button
              type="submit"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition duration-300"
            >
              Invia Messaggio
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Modale di contatto -->
    <div
      v-if="showContactModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full transition-all duration-300"
      >
        <h2 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Contact Seller
        </h2>
        <form
          @submit.prevent="sendMessage"
          method="POST"
          enctype="multipart/form-data"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                for="name"
                class="block font-medium text-sm text-gray-700 dark:text-gray-300"
                >Name</label
              >
              <input
                v-model="formData.name"
                id="name"
                class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 bg-white dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                name="name"
                required
              />
            </div>
            <div>
              <label
                for="surname"
                class="block font-medium text-sm text-gray-700 dark:text-gray-300"
                >Surname</label
              >
              <input
                v-model="formData.surname"
                id="surname"
                class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 bg-white dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                type="text"
                name="surname"
                required
              />
            </div>
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block font-medium text-sm text-gray-700 dark:text-gray-300"
              >Email</label
            >
            <input
              v-model="formData.email"
              id="email"
              class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 bg-white dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              type="email"
              name="email"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="message"
              class="block font-medium text-sm text-gray-700 dark:text-gray-300"
              >Message</label
            >
            <textarea
              v-model="formData.message"
              id="message"
              class="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 bg-white dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              name="message"
              rows="4"
              required
            ></textarea>
          </div>
          <div class="flex justify-end space-x-4">
            <button
              type="submit"
              class="px-6 py-2 bg-airbnbcolor hover:bg-airbnbcolorhover dark:bg-indigo-600 text-white rounded-lg font-semibold shadow-lg dark:hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
            >
              Send Message
            </button>
            <button
              @click="closeModal"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modale di conferma -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full transition-all duration-300"
      >
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Message Sent
        </h2>
        <p class="text-gray-700 dark:text-gray-300">
          Your message has been sent successfully!
        </p>
        <button
          @click="showModal = false"
          class="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  </main>
</template>

<script>
  import axios from '../axios'
  import MapTomTom from '../components/MapTomTom.vue'

  export default {
    name: 'details-apartment-copy',
    components: {
      MapTomTom,
    },
    data() {
      return {
        apartment: {},
        formData: {
          name: '',
          surname: '',
          email: '',
          message: '',
        },
        showModal: false,
        showContactModal: false,
        urlMap: '',
      }
    },
    computed: {
      imageUrl() {
        return `http://127.0.0.1:8000/storage/${this.apartment.img}`
      },
    },
    async created() {
      this.fetchApartment()
    },

    methods: {
      async fetchApartment() {
        try {
          const response = await axios.get(
            `/apartments/${this.$route.params.id}`
          )
          this.apartment = response.data
          console.log('Apartment data:', this.apartment)
          //funziona per la mappa di tomtom
          this.fetchMapData()
          // this.initMap(); //mappa dinamica

          // Incremento delle visualizzazioni
          this.incrementViewCount()
        } catch (error) {
          console.error('Error fetching apartment:', error)
        }
      },
      openModal() {
        this.showContactModal = true
      },
      closeModal() {
        this.showContactModal = false
      },
      async sendMessage() {
        try {
          const formDataWithApartmentId = {
            ...this.formData,
            apartment_id: this.apartment.id,
          }
          const response = await axios.post('/message', formDataWithApartmentId)
          console.log('Data sent:', response.data)

          this.formData = {
            name: '',
            surname: '',
            email: '',
            message: '',
          }

          this.showContactModal = false
          this.showModal = true
        } catch (error) {
          console.error(
            'Error sending message:',
            error.response ? error.response.data : error.message
          )
        }
      },
      //MAPPA STATICA
      async fetchMapData() {
        try {
          if (this.apartment.latitude && this.apartment.longitude) {
            const response = await axios.get('/map', {
              params: {
                lat: this.apartment.latitude,
                lng: this.apartment.longitude,
              },
            })
            this.urlMap = response.data.url
            // console.log(this.urlMap);
          } else {
            console.error('Latitude or longitude is missing:', this.apartment)
          }
        } catch (error) {
          console.error('Error fetching map data:', error)
        }
      },
      // mappa dinamica (da sistemare il la chiave)
      // initMap() {
      // 	// Inizializza la mappa TomTom
      // 	const map = tt.map({
      // 		key: {apiKey}, // Sostituisci con la tua API key
      // 		container: "map",
      // 		center: [this.apartment.longitude, this.apartment.latitude],
      // 		zoom: 15,
      // 	});

      // 	// Aggiungi un marker alla posizione dell'appartamento
      // 	const marker = new tt.Marker()
      // 		.setLngLat([this.apartment.longitude, this.apartment.latitude])
      // 		.addTo(map);
      // },
      async incrementViewCount() {
        try {
          await axios.post(
            `/apartments/${this.$route.params.id}/store-view-stat`
          )
          console.log('View count incremented')
        } catch (error) {
          console.error('Error incrementing view count:', error)
        }
      },
    },
  }
</script>
