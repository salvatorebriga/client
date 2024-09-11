<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700">Password:</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" class="w-full py-2 text-white rounded">
          Login
        </button>
        <!-- Mostra il messaggio di errore se presente -->
        <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../axios"; // Importa Axios per fare richieste HTTP

export default {
  data() {
    return {
      email: "", // Campo email collegato a v-model
      password: "", // Campo password collegato a v-model
      errorMessage: "", // Messaggio di errore da mostrare in caso di fallimento
    };
  },
  methods: {
    async login() {
      try {
        // Effettua la chiamata HTTP per il login
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });

        // console.log(response.data);

        // Salva il token ricevuto nella localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);

        // Reindirizza alla pagina dashboard
        this.$router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        // Gestione degli errori: mostra il messaggio di errore
        this.errorMessage =
          error.response?.data?.message || "An error occurred";
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
