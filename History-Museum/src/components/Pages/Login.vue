<template>
  <main class="page-main">
    <div class="container">
      <h1>Member Login</h1>
      <p>
        Sign in to save favorite eras, access curated reading lists, and receive
        updates about new historical content.
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

          <label for="password">Password</label>
          <!-- v-model auto update -->
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            v-model="password"
          />

          <!-- error message -->
          <p v-if="errorMsg" style="color: red; margin: 0;">{{ errorMsg }}</p>
          <!-- success message -->
          <p v-if="successMsg" style="color: green; margin: 0;">{{ successMsg }}</p>

          <RouterLink class="link-card" to="/create-account">
          <h3>Don't have an account yet?</h3>
          <p>Click here to create one.</p>
        </RouterLink>

          <button type="submit" class="button">Log In</button>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

// fake account
const MOCK_USERS = [
  { email: 'user@example.com', password: '123456' },
  { email: 'admin@historyhub.com', password: 'admin' },
]

// Input
const email    = ref('')
const password = ref('')

// receive message
const errorMsg   = ref('')
const successMsg = ref('')

// Login function
function handleLogin() {

  errorMsg.value   = ''
  successMsg.value = ''


  const user = MOCK_USERS.find(
    u => u.email === email.value && u.password === password.value
  )

  if (user) {
    successMsg.value = `Welcome back, ${email.value}!`
    // In a real project, you would: save token, redirect page, etc.
  } else {
    errorMsg.value = 'Invalid email or password.'
  }
}
</script>