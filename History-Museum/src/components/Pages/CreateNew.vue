<template>
  <main class="page-main">
    <div class="container">
      <h1>Create New Account</h1>
      <p>
        Sign up to get access to the latest historical content, save your favorite eras, and receive
      </p>

      <section class="page-section form-section">
        <!-- @submit.prevent prevent refresh，transfer to handleLogin -->
        <form @submit.prevent="handleLogin">
          <label for="email">Email</label>
          <!-- v-model auto update -->
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            v-model="email"
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            v-model="password"
          />

          <button type="submit" class="button">Create Account</button>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>

</script>