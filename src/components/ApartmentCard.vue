<template>
  <div v-if="isAvailable" class="dark:text-white">
    <img
      class="h-80 w-full mb-1 rounded-lg bg-center"
      :src="imageUrl"
      :alt="title"
    />
    <div class="p-1">
      <h2 class="font-bold mb-1">{{ title }}</h2>
      <p class="mb-1">Host: {{ host }}</p>
      <!-- <p>
        Available:
        <span :class="isAvailable ? 'text-green-500' : 'text-red-500'">{{
          isAvailable ? "Yes" : "No"
        }}</span>
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ApartmentCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    isAvailable: {
      type: Number,
      required: true,
    },
  },
  computed: {
    imageUrl() {
      return `http://127.0.0.1:8000/storage/${this.img}`;
    },
  },
};
</script>
