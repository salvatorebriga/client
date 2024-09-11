<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <!-- Alert di successo -->
      <div
        v-if="successMessage"
        class="absolute top-0 left-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-2 flex items-center justify-between"
        role="alert"
      >
        <span>{{ successMessage }}</span>
        <button
          @click="successMessage = ''"
          class="text-green-500 hover:text-green-700"
        >
          <svg
            class="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 8.586l-4.293-4.293-1.414 1.414L8.586 10l-4.293 4.293 1.414 1.414L10 11.414l4.293 4.293 1.414-1.414L11.414 10l4.293-4.293-1.414-1.414L10 8.586z"
            />
          </svg>
        </button>
      </div>

      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="register">
        <!-- Nome -->
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="form.name"
            id="name"
            type="text"
            class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:outline sm:text-sm"
            required
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-2">
            {{ errors.name }}
          </p>
        </div>

        <!-- Cognome -->
        <div class="mb-4">
          <label for="surname" class="block text-sm font-medium text-gray-700"
            >Surname</label
          >
          <input
            v-model="form.surname"
            id="surname"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline sm:text-sm"
            required
          />
          <p v-if="errors.surname" class="text-red-500 text-sm mt-2">
            {{ errors.surname }}
          </p>
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="form.email"
            id="email"
            type="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline sm:text-sm"
            required
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-2">
            {{ errors.email }}
          </p>
        </div>

        <!-- Data di nascita -->
        <div class="mb-4">
          <label
            for="date_of_birth"
            class="block text-sm font-medium text-gray-700"
            >Date of Birth (yyyy/mm/dd)</label
          >
          <input
            v-model="form.date_of_birth"
            id="date_of_birth"
            type="date"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline sm:text-sm"
            required
          />
          <p v-if="errors.date_of_birth" class="text-red-500 text-sm mt-2">
            {{ errors.date_of_birth }}
          </p>
        </div>

        <!-- Password -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline sm:text-sm"
            required
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-2">
            {{ errors.password }}
          </p>
        </div>

        <!-- Conferma password -->
        <div class="mb-4">
          <label
            for="password_confirmation"
            class="block text-sm font-medium text-gray-700"
            >Confirm Password</label
          >
          <input
            v-model="form.password_confirmation"
            id="password_confirmation"
            type="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline sm:text-sm"
            required
          />
          <p
            v-if="errors.password_confirmation"
            class="text-red-500 text-sm mt-2"
          >
            {{ errors.password_confirmation }}
          </p>
        </div>

        <!-- Bottone di registrazione -->
        <button
          type="submit"
          class="w-full text-white py-2 px-4 rounded-md font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  data() {
    return {
      form: {
        name: "",
        surname: "",
        email: "",
        date_of_birth: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
      successMessage: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("/register", this.form);
        this.successMessage = "Registration successful";
        this.errors = {};
        this.$router.push("/login").then(() => {
          window.location.reload();
        });
      } catch (error) {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background-color: #ff5a5f;
  &:hover {
    background-color: #db3b41;
  }
}
</style>
