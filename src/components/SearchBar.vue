<template>
  <div class="flex gap-3 flex-grow">
    <input
      class="border rounded-full shadow p-2 px-4 flex-grow"
      type="text"
      placeholder="Comincia a cercare"
      name="query"
    />

    <div
      class="bg-airbnbcolor hover:bg-airbnbcolorhover rounded-full text-white font-bold flex items-center p-2 px-3 dark:bg-indigo-400 hover:dark:bg-indigo-500"
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
export default {};
</script>
