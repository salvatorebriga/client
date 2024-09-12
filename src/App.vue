<template>
  <div :class="{ dark: isDarkMode }">
    <Header :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isDarkMode: localStorage.getItem("darkMode") === "true",
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
      document.documentElement.classList.toggle("dark", this.isDarkMode);
    },
  },
};
</script>

<style lang="scss" scoped>
/* Aggiungi eventuali stili aggiuntivi qui */
</style>
