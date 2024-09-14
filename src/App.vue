<template>
  <div class="relative w-screen h-screen" :class="{ dark: isDark }">
    <Header />
    <router-view></router-view>
    <ThemeSwitcher :isDark="isDark" @click="toggleDark" />
  </div>
</template>

<script>
import { useDark } from "@vueuse/core";
import Header from "./components/Header.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

export default {
  components: {
    Header,
    ThemeSwitcher,
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
