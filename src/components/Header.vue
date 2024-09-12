<template>
  <header class="py-4 border-b sticky top-0 bg-white">
    <div
      class="container mx-auto flex justify-between items-center px-2 sm:px-4"
    >
      <!-- Barra di ricerca -->
      <div class="flex-grow mx-4 flex items-center sm:justify-center">
        <input
          type="text"
          placeholder="Search"
          class="border dark:border-none px-4 py-2 rounded-full focus:outline-none font-medium shadow-sm sm:w-96 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      <div class="relative flex items-center gap-2">
        <!-- Icona utente -->
        <button
          @click="toggleMenu"
          class="focus:outline-none flex items-center space-x-2"
        >
          <img
            src="/public/user-icon.png"
            alt="User Icon"
            class="w-8 h-8 rounded-full"
            style="
              filter: brightness(0) saturate(100%) invert(41%) sepia(7%)
                saturate(19%) hue-rotate(1deg) brightness(97%) contrast(89%);
            "
          />
        </button>

        <!-- Menu a discesa con transizione -->
        <transition
          name="fade"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div
            v-if="showMenu"
            class="absolute right-0 mt-52 w-48 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600"
            ref="dropdownMenu"
          >
            <ul class="py-2">
              <li>
                <router-link
                  to="/"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  active-class="text-gray-300"
                >
                  Home
                </router-link>
              </li>
              <li>
                <a
                  href="http://127.0.0.1:8000/register"
                  target="_blank"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  active-class="text-gray-300"
                >
                  Become A Host
                </a>
              </li>
              <li>
                <hr class="my-2 border-gray-300 dark:border-gray-600" />
              </li>
              <li>
                <button
                  @click="toggleDarkMode"
                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 w-full text-left"
                >
                  Toggle Dark Mode
                  <span class="float-right">
                    <span v-if="isDarkMode">🌙</span>
                    <span v-else>🌞</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleDarkMode() {
      this.$emit("toggleDarkMode");
    },
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(-10px)";
    },
    enter(el, done) {
      el.offsetHeight; // trigger reflow
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      done();
    },
    leave(el, done) {
      el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      el.style.opacity = 0;
      el.style.transform = "translateY(-10px)";
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
/* Transizione di comparsa e scomparsa */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Colori dell'header */
header {
  @apply transition-colors duration-300;
}
</style>
