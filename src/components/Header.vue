<template>
  <header class="bg-blue-600 text-white py-4">
    <div class="container mx-auto flex justify-between items-center px-4">
      <h1 class="text-2xl font-bold">MyApp</h1>
      <nav>
        <ul class="flex space-x-4">
          <!-- Home sarà sempre visibile -->
          <li>
            <router-link
              to="/"
              class="hover:text-gray-200"
              active-class="text-gray-300"
            >
              Home
            </router-link>
          </li>
          <!-- Login e Register saranno visibili solo se l'utente non è loggato -->
          <li v-if="!isLoggedIn">
            <router-link
              to="/login"
              class="hover:text-gray-200"
              active-class="text-gray-300"
            >
              Login
            </router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link
              to="/register"
              class="hover:text-gray-200"
              active-class="text-gray-300"
            >
              Register
            </router-link>
          </li>
          <!-- Dashboard sarà visibile solo se l'utente è loggato -->
          <li v-if="isLoggedIn">
            <router-link
              to="/dashboard"
              class="hover:text-gray-200"
              active-class="text-gray-300"
            >
              Dashboard
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token"); // Verifica se il token esiste
    },
  },
};
</script>

<style scoped>
/* Aggiungi ulteriori stili se necessario */
</style>
