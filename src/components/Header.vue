<template>
  <header class="border-b sticky top-0 bg-white">
    <div class="container mx-auto flex justify-between items-center px-2 sm:px-4">
      <!-- Logo -->
      <div class="hidden sm:block">
        <img src="/boolbnb-logo.png" alt="Logo" class="max-w-20" />
      </div>

      <!-- Barra di ricerca -->
      <div class="flex-grow mx-4 flex items-center sm:justify-center">
        <input type="text" placeholder="Search"
          class="border px-4 py-2 rounded-full focus:outline-none font-medium shadow sm:w-7/12" />
      </div>

      <div class="relative flex items-center gap-2">
        <!-- Icona utente con nome -->
        <p class="hidden sm:block font-semibold" v-if="name">{{ name }}</p>
        <button @click="toggleMenu" class="focus:outline-none flex items-center space-x-2">
          <img src="/public/user-icon.png" alt="User Icon" class="w-8 h-8 rounded-full" style="
              filter: brightness(0) saturate(100%) invert(41%) sepia(7%)
                saturate(19%) hue-rotate(1deg) brightness(97%) contrast(89%);
            " />
        </button>

        <!-- Menu a discesa -->
        <div v-if="showMenu" class="absolute right-0 mt-48 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul class="py-2">
            <!-- Home sempre visibile -->
            <li>
              <router-link to="/" class="block px-4 py-2 text-gray-700 hover:bg-gray-100" active-class="text-gray-300">
                Home
              </router-link>
            </li>
            <!-- Se non è loggato, mostra Login e Register -->

            <li>
              <a href="http://127.0.0.1:8000/register" target="_blank"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100" active-class="text-gray-300">
                Became An Host
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Modale di conferma logout -->
  </header>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false, // Controlla la visibilità del menu utente
    };
  },
  computed: {},
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu; // Toggle per mostrare/nascondere il menu
    },
  },
};
</script>

<style lang="scss" scoped></style>
