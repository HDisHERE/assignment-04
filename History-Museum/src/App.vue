<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Home from './components/Home.vue'
</script>

<template>
  <div class="page">
    <Navbar />

    <Home />

    <Footer />
  </div>
</template>

<style>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>