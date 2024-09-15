<template>
  <div v-if="isVisible" class="flex gap-3 flex-grow">
    <input
      v-model="query"
      class="border rounded-full shadow p-2 px-4 flex-grow text-black dark:bg-gray-900 dark:border-none dark:text-white"
      type="text"
      placeholder="Comincia a cercare"
      name="query"
    />

    <div
      @click="search"
      class="cursor-pointer bg-airbnbcolor hover:bg-airbnbcolorhover rounded-full text-white font-bold flex items-center p-2 px-3 dark:bg-indigo-600 hover:dark:bg-indigo-700"
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
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  computed: {
    isVisible() {
      // Controlla se la route attuale è '/advanced-search'
      return this.$route.name !== "advanced-search";
    },
  },
  methods: {
    search() {
      if (this.query) {
        // Naviga alla pagina advanced-search con il parametro 'query'
        this.$router.push({
          name: "advanced-search",
          query: { query: this.query },
        });
      }
    },
  },
};
</script>
