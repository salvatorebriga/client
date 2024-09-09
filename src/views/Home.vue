<template>
  <div class="bg-gray-100 min-h-screen">
    <section class="bg-blue-600 text-white py-16">
      <div class="container mx-auto text-center">
        <h1 class="text-4xl font-bold mb-4">Welcome to MyApp</h1>
        <p class="text-lg mb-8">
          Your gateway to seamless authentication and user management.
        </p>
        <router-link
          to="/register"
          class="inline-block bg-white text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-100"
        >
          Get Started
        </router-link>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-6">Features</h2>
        <div class="flex flex-wrap justify-center gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h3 class="text-xl font-semibold mb-4">Easy Registration</h3>
            <p>
              Sign up quickly and easily with our user-friendly registration
              process.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h3 class="text-xl font-semibold mb-4">Secure Login</h3>
            <p>
              Enjoy a secure login experience with industry-standard security
              practices.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h3 class="text-xl font-semibold mb-4">Manage Your Profile</h3>
            <p>Easily manage your profile and settings in your dashboard.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-blue-600 text-white py-16">
      <div class="container mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Stay Connected</h2>
        <p class="text-lg mb-8">
          Follow us on social media for the latest updates and news.
        </p>
        <div class="flex justify-center gap-4">
          <a
            href="https://twitter.com/your-profile"
            class="text-blue-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M23 3a10.5 10.5 0 01-3 1 5.1 5.1 0 002.25-2.8 10.4 10.4 0 01-3.3 1.25A5.04 5.04 0 0016.5 5c-2.8 0-5.05 2.3-5.05 5.1 0 .4.05.8.1 1.2-4.2-.2-.3-.3-.6-.3-.9a5.1 5.1 0 004.5 5.5 5.2 5.2 0 01-2.3-.1v.1a5.1 5.1 0 004.7 5.1 5.1 5.1 0 01-2.3.1 5.2 5.2 0 004.8 3.5c5.7 0 8.9-4.7 8.9-8.8v-.4A6.4 6.4 0 0023 3z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/your-repo"
            class="text-gray-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3C6.48 3 2 7.48 2 12c0 4.42 2.86 8.16 6.84 9.48.5.09.68-.22.68-.49v-1.68c-2.7.59-3.27-1.29-3.27-1.29-.44-1.12-1.08-1.42-1.08-1.42-.89-.6.07-.59.07-.59 1.03.07 1.57 1.06 1.57 1.06.92 1.58 2.41 1.12 3.01.85.09-.67.36-1.12.66-1.37-2.34-.27-4.81-1.17-4.81-5.2 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.37.1-2.85 0 0 .88-.28 2.89 1.06.84-.23 1.73-.35 2.62-.36.89.01 1.78.13 2.62.36 2.01-1.34 2.89-1.06 2.89-1.06.58 1.48.21 2.58.1 2.85.67.74 1.08 1.68 1.08 2.83 0 4.04-2.47 4.92-4.82 5.19.37.32.69.95.69 1.91v2.84c0 .27.18.59.69.49C21.14 20.16 24 16.42 24 12c0-4.52-4.48-9-12-9z"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
/* Aggiungi ulteriori stili se necessario */
</style>
