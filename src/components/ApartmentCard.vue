<!-- src/components/ApartmentCard.vue -->
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

<template>
  <div class="bg-white rounded-lg overflow-hidden">
    <img
      v-if="apartment.img"
      :src="`${imgUrl}${apartment.img}`"
      alt="Apartment Image"
      class="w-full h-60 object-cover rounded-lg"
    />
    <div class="p-1">
      <p class="font-semibold text-lg">{{ apartment.title }}</p>
      <p class="text-gray-600 mt-1">
        Host: {{ apartment.user.name }} {{ apartment.user.surname }}
      </p>
      <p
        :class="[
          'mb-4',
          'mt-1',
          apartment.is_available ? 'text-green-500' : 'text-red-500',
        ]"
      >
        {{ apartment.is_available ? "Available" : "Not available" }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
