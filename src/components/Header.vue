<template>
  <header
    class="px-6 3xl:px-20 border-b border-gray-300 bg-white dark:bg-gray-950 dark:border-none dark:text-white transition-all duration-300"
  >
    <div class="py-6 justify-between flex items-center">
      <!-- sinistra -->
      <div class="left flex items-center w-1/3 gap-2 lg:pb-16">
        <!-- Logo per la modalità chiara -->
        <img
          class="light block dark:hidden hover:scale-105"
          src="/public/img/boolbnb-logo.png"
          alt="Logo"
          href="/"
        />
        <!-- Logo per la modalità scura -->
        <img
          class="dark hidden dark:block hover:scale-105"
          src="/public/img/boolbnb-logo.png"
          alt="Logo Dark Mode"
        />
        <a
          href="/"
          class="hover:scale-105 text-2xl font-bold text-airbnbcolor hover:text-airbnbcolorhover dark:text-white dark:hover:text-indigo-400 transition-all duration-300"
          >BoolBnB</a
        >
      </div>

      <!-- centro -->
      <div class="hidden lg:flex justify-center items-center w-1/3 flex-col">
        <SearchBar></SearchBar>
      </div>

      <!-- destra -->
      <div class="flex items-center justify-end gap-6 w-1/3 flex-grow lg:pb-16">
        <!-- href to dashboard -->
        <div
          class="hidden sm:block px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-indigo-400 transition-all duration-300 hover:scale-105"
        >
          <a class="font-bold" href="http://127.0.0.1:8000/login"
            >Became a Host</a
          >
        </div>

        <!-- icona pianeta -->
        <div
          class="hover:scale-125 hidden md:block hover:bg-gray-200 dark:hover:bg-indigo-400 rounded-full p-3 cursor-pointer transition-all duration-300"
        >
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
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
        </div>

        <!-- hamburger menù -->
        <div
          class="bg-airbnbcolor text-white hover:bg-airbnbcolorhover hamburger relative rounded-lg p-3 cursor-pointer dark:bg-indigo-600 dark:hover:bg-indigo-400 transition-all duration-300"
          @click="toggleMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#fc595f"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <!-- menu a tendina -->
          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-40"
          >
            <!-- Opzione per il tema scuro con icone -->
            <a
              href="#"
              @click="toggleDark"
              class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-indigo-400 transition-all duration-300"
            >
              <!-- Icona del sole (light mode) o della luna (dark mode) -->
              <svg
                v-if="isDark === false"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
              {{ isDark ? "Light Mode" : "Dark Mode" }}
            </a>
            <!-- Separatore -->
            <hr class="sm:hidden my-2 border-gray-200 dark:border-gray-700" />

            <!-- Affitta con BoolBnB -->
            <a
              href="#"
              class="px-4 sm:hidden py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-indigo-400 transition-all duration-300"
            >
              Became a Host
            </a>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container pb-6 mx-auto justify-center flex items-center lg:hidden p-3"
    >
      <SearchBar></SearchBar>
    </div>
  </header>
</template>

<script>
import { useDark } from "@vueuse/core";
import SearchBar from "./SearchBar.vue";

export default {
  name: "Header",
  data() {
    return {
      isDark: useDark(),
      isMenuOpen: false,
    };
  },
  components: {
    SearchBar,
  },
  methods: {
    toggleDark() {
      this.isDark = !this.isDark;
      console.log(this.isDark);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  img {
    width: 35px;
    cursor: pointer;
  }
  .light {
    &:hover {
      filter: brightness(0) saturate(100%) invert(27%) sepia(91%)
        saturate(1741%) hue-rotate(343deg) brightness(87%) contrast(86%);
    }
  }
  .dark {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(9%)
      hue-rotate(242deg) brightness(102%) contrast(100%);

    &:hover {
      filter: brightness(0) saturate(100%) invert(54%) sepia(32%)
        saturate(1133%) hue-rotate(198deg) brightness(101%) contrast(94%);
    }
  }
}
</style>
