<!-- src/views/Home.vue -->
<template>
  <!-- Hero Section -->
  <main class="hero">
    <div class="container hero-content">
      <h1>Explore the stories that shaped our world</h1>
      <p>
        A curated collection of historical subjects, timelines, and insights
        spanning ancient civilizations, cultural revolutions, and global events.
      </p>
    </div>
  </main>

  <!-- Purpose Section -->
  <section class="purpose" id="purpose">
    <div class="container">
      <div class="purpose-intro">
        <h2>Our Purpose</h2>
        <p>
          History Hub helps learners, teachers, and curious readers discover
          the eras, people, and turning points that define our shared past.
        </p>
      </div>

      <div class="link-grid">
        <RouterLink class="link-card" to="/ancient">
          
          <h3>Ancient Civilizations</h3>
          <p>Explore the foundations of early empires, myths, and innovations.</p>
        </RouterLink>

        <RouterLink class="link-card" to="/renaissance">
          <h3>Renaissance & Early Modern</h3>
          <p>Discover cultural renewal, scientific breakthroughs, and global change.</p>
        </RouterLink>

        <RouterLink class="link-card" to="/industrial">
          <h3>Industrial Revolution</h3>
          <p>Learn how technology and industry reshaped society and everyday life.</p>
        </RouterLink>

        <RouterLink class="link-card" to="/world-wars">
          <h3>World Wars</h3>
          <p>Understand the conflicts that defined the twentieth century.</p>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style scoped>

</style>