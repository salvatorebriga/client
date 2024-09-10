<template>
  <header class="py-4 border-b-2">
    <div class="container mx-auto flex justify-between items-center px-4">
      <!-- Logo -->
      <div>
        <img
          src="/public/Airbnb_Logo_Bélo.svg.png"
          alt="Logo"
          class="max-w-20"
          style="filter: brightness(0) saturate(100%)"
        />
      </div>

      <!-- Barra di ricerca -->
      <div class="flex-grow mx-4 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search"
          class="border px-4 py-2 rounded-full focus:outline-none"
        />
      </div>

      <div class="relative flex items-center">
        <!-- Icona utente con nome -->
        <p class="hidden sm:block mr-2" v-if="name">{{ name }}</p>
        <button
          @click="toggleMenu"
          class="focus:outline-none flex items-center space-x-2"
        >
          <img
            src="/public/user-icon.png"
            alt="User Icon"
            class="w-8 h-8 rounded-full"
          />
        </button>

        <!-- Menu a discesa -->
        <div
          v-if="showMenu"
          class="absolute right-0 mt-48 w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <ul class="py-2">
            <!-- Home sempre visibile -->
            <li>
              <router-link
                to="/"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                active-class="text-gray-300"
              >
                Home
              </router-link>
            </li>
            <!-- Se non è loggato, mostra Login e Register -->
            <li v-if="!isLoggedIn">
              <router-link
                to="/login"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                active-class="text-gray-300"
              >
                Login
              </router-link>
            </li>
            <li v-if="!isLoggedIn">
              <router-link
                to="/register"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                active-class="text-gray-300"
              >
                Register
              </router-link>
            </li>
            <!-- Se è loggato, mostra Dashboard -->
            <li v-if="isLoggedIn">
              <a
                href="http://127.0.0.1:8000/"
                target="_blank"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                active-class="text-gray-300"
              >
                Dashboard
              </a>
            </li>
            <!-- Logout -->
            <li v-if="isLoggedIn">
              <button
                @click="confirmLogout"
                class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modale di conferma logout -->
    <div
      v-if="showLogoutModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 class="text-xl font-semibold mb-4">Conferma Logout</h2>
        <p class="mb-4">Sei sicuro di voler uscire?</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelLogout"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Annulla
          </button>
          <button
            @click="logout"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Conferma
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false, // Controlla la visibilità del menu utente
      showLogoutModal: false, // Controlla la visibilità del modale di logout
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token"); // Verifica se il token esiste
    },
    name() {
      return localStorage.getItem("name"); // Ottieni il nome dell'utente
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu; // Toggle per mostrare/nascondere il menu
    },
    confirmLogout() {
      this.showLogoutModal = true; // Mostra il modale di conferma logout
    },
    cancelLogout() {
      this.showLogoutModal = false; // Chiudi il modale senza sloggare
    },
    logout() {
      localStorage.removeItem("token"); // Rimuove il token per fare il logout
      localStorage.removeItem("name"); // Rimuove anche il nome dell'utente
      this.$router.push("/login").then(() => {
        window.location.reload(); // Reindirizza e ricarica la pagina
      });
      this.showLogoutModal = false; // Chiudi il modale
      this.showMenu = false; // Chiudi il menu
    },
  },
};
</script>

<style lang="scss" scoped></style>
