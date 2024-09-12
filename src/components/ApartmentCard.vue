<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-md transition-all hover:shadow-lg"
  >
    <img
      v-if="apartment.img"
      :src="`${imgUrl}${apartment.img}`"
      alt="Apartment Image"
      class="w-full h-60 object-cover rounded-t-lg"
    />
    <div class="p-4">
      <p class="font-semibold text-lg text-gray-900 dark:text-gray-100">
        {{ apartment.title }}
      </p>
      <p class="text-gray-600 dark:text-gray-300 mt-1">
        Host: {{ apartment.user.name }} {{ apartment.user.surname }}
      </p>
      <p
        :class="[
          'mt-1',
          apartment.is_available ? 'text-green-500' : 'text-red-500',
        ]"
      >
        {{ apartment.is_available ? "Available" : "Not available" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apartment: {
      type: Object,
      required: true,
    },
    imgUrl: {
      type: String,
      default: "http://127.0.0.1:8000/storage/",
    },
  },
};
</script>

<style lang="scss" scoped>
/* Assicurati che i colori siano definiti per la modalità chiara e scura */
</style>
