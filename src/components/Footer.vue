<template>
  <footer
    class="bg-gray-100 dark:bg-gray-950 py-8 transition-all duration-300 3xl:px-96"
  >
    <div class="container mx-auto px-4">
      <!-- Sections of the footer -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="section in sections" :key="section.title">
          <h5
            class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 transition-all duration-300"
          >
            {{ section.title }}
          </h5>
          <ul class="space-y-2">
            <li v-for="item in section.items" :key="item">
              <a
                href="#"
                class="inline-block transform hover:scale-105 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom Section -->
      <div
        class="border-t border-gray-300 dark:border-gray-600 pt-8 mt-8 transition-all duration-300"
      >
        <div class="flex flex-col md:flex-row md:justify-between items-center">
          <!-- Footer links -->
          <div class="flex space-x-4 mb-4 md:mb-0">
            <a
              v-for="link in footerLinks"
              :key="link.text"
              :href="link.url"
              class="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm transition-all duration-300 transform hover:scale-105"
            >
              {{ link.text }}
            </a>
          </div>

          <!-- Social Media Icons -->
          <div class="flex space-x-4 mb-4 md:mb-0">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-300 transform hover:scale-125"
            >
              <i :class="social.iconClass"></i>
            </a>
          </div>
        </div>

        <!-- Copyright -->
        <div
          class="flex flex-col md:flex-row md:justify-start text-gray-500 dark:text-gray-400 text-sm transition-all duration-300"
        >
          <p class="mb-2 md:mb-0">&copy; 2024 Boolbnb, Inc.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
        sections: [
          {
            title: 'Support',
            items: [
              'Help Center',
              'BoolCover',
              'Anti-Discrimination',
              'Disability Support',
              'Cancellation Options',
              'Report neighborhood concern',
            ],
          },
          {
            title: 'Hosting',
            items: [
              'Boolbnb your home',
              'BoolCover for Hosts',
              'Hosting Resources',
              'Community Forum',
              'Hosting responsibly',
              'Join a free Hosting class',
            ],
          },
          {
            title: 'Boolbnb',
            items: [
              'Newsroom',
              'New Features',
              'Careers',
              'Investors',
              'Gift Cards',
              'Boolbnb.org emergency stays',
            ],
          },
        ],
        footerLinks: [
          { text: 'Privacy', url: '#' },
          { text: 'Terms', url: '#' },
          { text: 'Sitemap', url: '#' },
          { text: 'Company details', url: '#' },
        ],
        socialLinks: [
          { name: 'Facebook', url: '#', iconClass: 'fab fa-facebook-f' },
          { name: 'Twitter', url: '#', iconClass: 'fab fa-twitter' },
          { name: 'Instagram', url: '#', iconClass: 'fab fa-instagram' },
        ],
      }
    },
  }
</script>
