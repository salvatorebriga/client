<template>
  <div>
    <router-view></router-view>
    <button
      @click="toggleDark"
      class="p-4 text-white rounded-full bg-indigo-700"
    >
      <p v-if="isDark === true">LGT</p>
      <p v-else>DRK</p>
    </button>
  </div>
</template>

<script>
import { useDark, useToggle } from "@vueuse/core";

export default {
  data() {
    return {
      isDark: useDark(), // Returns a reactive object
    };
  },
  // created() {
  //   console.log(this.isDark);
  // },
  methods: {
    toggleDark() {
      this.isDark = !this.isDark;
      console.log(this.isDark);
    },
  },
};
</script>

<style lang="scss" scoped></style>
