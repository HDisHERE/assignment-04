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

          <RouterLink  to="/create-account">
          <p>Don't have an account yet? Click here to create one.</p>
        </RouterLink>

          <button type="submit" class="button" :disabled="loading">Log In</button>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { userInfo } from '@/userInfo.js'

const { setUser } = userInfo() 

const email      = ref('')
const password   = ref('')
const errorMsg   = ref('')
const successMsg = ref('')
const loading    = ref(false)

const router = useRouter()

async function handleLogin() {
  errorMsg.value   = ''
  successMsg.value = ''
  loading.value    = true

  try {
    const res  = await fetch('/api/login', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email: email.value, password: password.value }),
    })
    const data = await res.json()

    if (!res.ok) {
      errorMsg.value = data.error
    } else {
      setUser(email.value)
      successMsg.value = data.message
      // After successful login, redirect to home page after 1 second
      setTimeout(() => router.push('/'), 1000)
    }
  } catch {
    errorMsg.value = 'Cannot connect to server. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>