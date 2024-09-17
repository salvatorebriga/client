<template>
  <header
    class="border-b border-gray-300 bg-white dark:bg-gray-800 dark:border-none dark:text-white"
  >
    <div class="container py-6 mx-auto justify-between flex items-center">
      <!-- sinistra -->
      <div class="flex items-center w-1/3 px-4">
        <a
          href="/"
          class="text-2xl font-bold hover:text-airbnbcolorhover dark:hover:text-indigo-400"
          >BoolBnB</a
        >
      </div>

      <!-- centro -->
      <div class="hidden lg:flex justify-center items-center w-1/3">
        <SearchBar></SearchBar>
      </div>

      <!-- destra -->
      <div class="flex items-center justify-end gap-6 w-1/3 flex-grow">
        <!-- href to dashboard -->
        <div
          class="hidden sm:block px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-indigo-400"
        >
          <a class="font-bold" href="http://127.0.0.1:8000/login"
            >Affitta con BoolBnB</a
          >
        </div>

        <!-- icona pianeta -->
        <div
          class="hidden md:block hover:bg-gray-200 dark:hover:bg-indigo-400 rounded-full p-3 cursor-pointer"
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
        <!-- menù -->
        <div
          class="hamburger rounded-lg p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-indigo-400"
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
import SearchBar from "./SearchBar.vue";
export default {
  name: "Header",
  data() {
    return {};
  },
  components: {
    SearchBar,
  },
};
</script>
