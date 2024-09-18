<template>
  <main
    class="container mx-auto pt-10 rounded-lg dark:bg-gray-900 dark:text-white"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h1 class="w-full text-2xl font-bold mb-5">{{ apartment.title }}</h1>
      <!-- Immagine a Sinistra -->
      <div class="flex gap-6 mb-5">
        <div class="flex-shrink-0 w-2/3">
          <img
            :src="imageUrl"
            alt="Apartment Image"
            class="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <!-- Descrizione a Destra -->
        <div class="w-1/3">
          <p class="text-lg mb-2">
            <strong>Address:</strong> {{ apartment.address }}
          </p>
          <!-- Nome e cognome, v-if per risolvere errore in console -->
          <p class="text-lg mb-2" v-if="apartment.user">
            <strong>Host:</strong> {{ apartment.user.name }}
            {{ apartment.user.surname }}
          </p>
          <p class="text-lg mb-2">
            <strong>Rooms:</strong> {{ apartment.rooms }}
          </p>
          <p class="text-lg mb-2">
            <strong>Beds:</strong> {{ apartment.beds }}
          </p>
          <p class="text-lg mb-2">
            <strong>Available:</strong>
            {{ apartment.is_available ? "Yes" : "No" }}
          </p>
        </div>
      </div>

      <!-- Pulsante per contattare il venditore -->
      <div class="w-2/3 mt-4">
        <button
          @click="openModal"
          class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Contact Seller
        </button>
      </div>

      <!-- Modale di contatto -->
      <div
        v-if="showContactModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2
            class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100"
          >
            Contact Seller
          </h2>
          <form
            @submit.prevent="sendMessage"
            method="POST"
            enctype="multipart/form-data"
          >
            <!-- Name -->
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="mb-4">
                <label
                  for="name"
                  class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
                  >Name</label
                >
                <input
                  v-model="formData.name"
                  id="name"
                  class="border-2 border-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
                  type="text"
                  name="name"
                  required
                  autofocus
                />
              </div>

              <!-- Surname -->
              <div class="mb-4">
                <label
                  for="surname"
                  class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
                >
                  Surname
                </label>
                <input
                  v-model="formData.surname"
                  id="surname"
                  class="border-2 border-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
                  type="text"
                  name="surname"
                  required
                  autofocus
                />
              </div>
            </div>
            <!-- Email -->
            <div class="mb-4">
              <label
                for="email"
                class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
              >
                Email:
              </label>
              <input
                v-model="formData.email"
                id="email"
                class="border-2 border-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
                type="email"
                name="email"
                required
                autofocus
              />
            </div>
            <!-- Message -->
            <div class="mb-4">
              <label
                for="message"
                class="block font-medium text-sm text-gray-700 dark:text-gray-300 py-2"
              >
                Message:
              </label>
              <textarea
                v-model="formData.message"
                id="message"
                class="border-2 border-black dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block mt-1 w-full"
                name="message"
                required
                autofocus
              />
            </div>
            <!-- Submit Button -->
            <button
              type="submit"
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Send Message
            </button>
          </form>
          <button
            @click="closeModal"
            class="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>

      <!-- Modale di conferma -->
      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
        >
          <h2
            class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100"
          >
            Message Sent
          </h2>
          <p class="text-gray-700 dark:text-gray-300">
            Your message has been sent successfully!
          </p>
          <button
            @click="showModal = false"
            class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "../axios";

export default {
  name: "details-apartment",
  data() {
    return {
      apartment: {},
      formData: {
        name: "",
        surname: "",
        email: "",
        message: "",
      },
      showModal: false,
      showContactModal: false,
    };
  },
  computed: {
    imageUrl() {
      return `http://127.0.0.1:8000/storage/${this.apartment.img}`;
    },
  },
  async created() {
    this.fetchApartment();
  },
  methods: {
    async fetchApartment() {
      try {
        const response = await axios.get(
          `/apartments/${this.$route.params.id}`
        );
        this.apartment = response.data;
      } catch (error) {
        console.error("Error fetching apartment:", error);
      }
    },
    openModal() {
      this.showContactModal = true;
    },
    closeModal() {
      this.showContactModal = false;
    },
    async sendMessage() {
      try {
        // Aggiungi l'ID dell'appartamento ai dati del modulo
        const formDataWithApartmentId = {
          ...this.formData,
          apartment_id: this.apartment.id, // Assicurati che questo ID sia disponibile
        };

        // Endpoint per la tua API back-end
        const response = await axios.post("/message", formDataWithApartmentId);
        console.log("Dati inviati:", response.data);

        // Svuota i campi del modulo
        this.formData = {
          name: "",
          surname: "",
          email: "",
          message: "",
        };

        // Chiudi la modale di contatto e mostra la modale di conferma
        this.showContactModal = false;
        this.showModal = true;
      } catch (error) {
        // Verifica se l'errore ha una risposta dal server
        if (error.response) {
          // Il server ha risposto con uno stato diverso da 2xx
          console.error(
            "Errore durante l’invio dei dati:",
            error.response.data
          );
        } else if (error.request) {
          // La richiesta è stata effettuata, ma non è stata ricevuta una risposta
          console.error(
            "Errore durante l’invio dei dati: Nessuna risposta ricevuta dal server"
          );
        } else {
          // Qualcun altro errore
          console.error("Errore:", error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Se necessario, puoi aggiungere stili CSS aggiuntivi qui */
</style>
