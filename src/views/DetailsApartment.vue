<template>
  <main class="container mx-auto transition-all duration-300 py-14">
    <h1
      class="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 px-20 lg:px-10 mb-10"
    >
      {{ apartment.title }}
    </h1>
    <div class="container mx-auto transition-all duration-300 lg:flex">
      <div class="left flex flex-col w-full px-20 lg:px-10 lg:w-1/2">
        <!-- Sezione immagine e descrizione -->
        <div class="transition-all duration-300">
          <!-- Titolo -->

          <!-- Immagine -->
          <div class="transition-all duration-300" max-h-80>
            <img
              :src="imageUrl"
              alt="Apartment Image"
              class="w-full max-h-96 rounded-lg object-cover transition-transform duration-500 hover:scale-105 mb-6"
            />
          </div>
        </div>
        <!-- Descrizione -->
        <div class="rounded-lg transition-all duration-300">
          <div class="flex flex-col">
            <p class="text-lg mb-4 text-gray-800 dark:text-gray-500">
              {{ apartment.address }}
            </p>
            <p class="text-lg mb-4 text-gray-800 dark:text-gray-100">
              The Apartment is

              {{
                apartment.is_available
                  ? "available right now"
                  : "not available right now"
              }}
            </p>
          </div>

          <div class="flex gap-8">
            <p class="text-lg mb-4 text-gray-500 dark:text-gray-100">
              {{ apartment.rooms }} Rooms with {{ apartment.beds }} Beds and
              {{ apartment.bathrooms }} bathrooms
            </p>
          </div>

          <div
            v-if="apartment.user"
            class="border-t-2 border-b-2 dark:border-t-indigo-600 dark:border-b-indigo-600 flex items-center p-5 gap-4"
          >
            <div class="p-4 bg-gray-200 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>

            <div>
              <p class="text-lg text-gray-800 dark:text-gray-100">
                Host name:
                {{ apartment.user.name }}
                {{ apartment.user.surname }}
              </p>
              <p class="dark:text-gray-400">
                Superhost - 5 years of experience
              </p>
            </div>
          </div>
        </div>

        <div class="my-8">
          <p class="text-gray-800 dark:text-gray-100 text-2xl">
            Services available
          </p>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:gap-8 p-8 text-gray-800 dark:text-gray-100"
          >
            <ul class="space-y-2">
              <li
                v-for="(item, index) in apartment.services"
                :key="index"
                v-show="index % 2 === 0"
              >
                {{ item.name }}
              </li>
            </ul>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in apartment.services"
                :key="index"
                v-show="index % 2 !== 0"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Pulsante di contatto -->
        <div class="flex justify-start">
          <button
            @click="openModal"
            class="mb-10 hover:scale-105 px-6 py-3 bg-airbnbcolor hover:bg-airbnbcolorhover dark:bg-indigo-600 text-white rounded-lg font-semibold shadow-lg dark:hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
          >
            Contact Host
          </button>
        </div>
      </div>

      <div
        class="right flex px-20 lg:px-10 my-10 lg:my-0 lg:w-1/2 transition-transform duration-500 hover:scale-105"
      >
        <div
          class="w-full h-96 bg-gray-800 rounded-lg flex justify-center items-center text-white"
        >
          PlaceHolder Maps
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
        console.log(this.apartment);
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
        const formDataWithApartmentId = {
          ...this.formData,
          apartment_id: this.apartment.id,
        };
        const response = await axios.post("/message", formDataWithApartmentId);
        console.log("Data sent:", response.data);

        this.formData = {
          name: "",
          surname: "",
          email: "",
          message: "",
        };

        this.showContactModal = false;
        this.showModal = true;
      } catch (error) {
        console.error(
          "Error sending message:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
};
</script>
