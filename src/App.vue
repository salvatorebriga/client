<template>
  <div class="">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  export default {
    components: {
      Header,
      Footer,
    },
    data() {
      return {}
    },
  }
</script>
