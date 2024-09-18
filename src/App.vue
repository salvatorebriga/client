<template>
  <div class="">
    <Header />
    <router-view></router-view>
    <ThemeSwitcher :isDark="isDark" @click="toggleDark" />
    <Footer />
  </div>
</template>

<script>
import { useDark } from "@vueuse/core";
import Header from "./components/Header.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    ThemeSwitcher,
    Footer,
  },
  data() {
    return {
      isDark: useDark(), // Returns a reactive object
    };
  },
  mounted() {
    console.log(this.isDark);
  },
  methods: {
    toggleDark() {
      this.isDark = !this.isDark;
      console.log(this.isDark);
    },
  },
};
</script>
