<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="register">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            v-model="form.name"
            id="name"
            type="text"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-2">
            {{ errors.name }}
          </p>
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="form.email"
            id="email"
            type="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-2">
            {{ errors.email }}
          </p>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-2">
            {{ errors.password }}
          </p>
        </div>

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
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <p
            v-if="errors.password_confirmation"
            class="text-red-500 text-sm mt-2"
          >
            {{ errors.password_confirmation }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700"
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
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post("/register", this.form);
        alert("Registration successful");
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

<style scoped></style>
