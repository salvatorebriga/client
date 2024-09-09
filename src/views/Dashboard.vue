<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>

      <!-- Mostra uno spinner di caricamento finché i dati non sono pronti -->
      <div v-if="loading" class="flex justify-center">
        <svg
          class="animate-spin h-8 w-8 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.965 7.965 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>

      <!-- Mostra i dati dell'utente una volta che sono stati caricati -->
      <div v-else>
        <p class="text-gray-700">Welcome, {{ user.name }}!</p>

        <!-- Pulsante Logout -->
        <router-link to="/logout">
          <button
            class="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../axios"; // Importa Axios per fare richieste HTTP

export default {
  data() {
    return {
      user: {}, // Oggetto utente che conterrà i dati recuperati
      loading: true, // Stato di caricamento
    };
  },
  async created() {
    try {
      // Recupera i dati dell'utente autenticato
      const response = await axios.get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Invia il token come Authorization header
        },
      });
      this.user = response.data; // Assegna i dati dell'utente alla variabile 'user'
    } catch (error) {
      console.error("Failed to fetch user", error);
      // Reindirizza l'utente al login se non è autenticato o se c'è un errore
      this.$router.push("/login").then(() => {
        window.location.reload();
      });
    } finally {
      this.loading = false; // Imposta loading a false dopo che i dati sono stati caricati o se si verifica un errore
    }
  },
};
</script>

<style scoped>
/* Aggiungi ulteriori stili se necessario */
</style>
