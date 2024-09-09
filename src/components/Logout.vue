<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center">
      <button
        @click="logout"
        class="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  methods: {
    async logout() {
      try {
        await axios.post("/logout");
        localStorage.removeItem("token");
        this.$router.push("/login").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
  },
};
</script>
