<template>
  <main class="page-main">
    <div class="container">
      <h1>Create New Account</h1>
      <p>Sign up to get access to the latest historical content and save your favourite eras.</p>

      <section class="page-section form-section">
        <form @submit.prevent="handleRegister">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            v-model="email"
            required
          />

          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="At least 6 characters"
            v-model="password"
            required
          />

          <label for="confirm">Confirm Password</label>
          <input
            type="password"
            id="confirm"
            placeholder="Re-enter your password"
            v-model="confirm"
            required
          />

          <p v-if="errorMsg"   style="color: red;   margin: 0;">{{ errorMsg }}</p>
          <p v-if="successMsg" style="color: green; margin: 0;">{{ successMsg }}</p>

          <RouterLink to="/login">
            <p>Already have an account? Click here to log in.</p>
          </RouterLink>

          <button type="submit" class="button" :disabled="loading">
            {{ loading ? 'Creating…' : 'Create Account' }}
          </button>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email      = ref('')
const password   = ref('')
const confirm    = ref('')
const errorMsg   = ref('')
const successMsg = ref('')
const loading    = ref(false)

const router = useRouter()

async function handleRegister() {
  errorMsg.value   = ''
  successMsg.value = ''

  if (password.value !== confirm.value) {
    errorMsg.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    const res  = await fetch('/api/register', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email: email.value, password: password.value }),
    })
    const data = await res.json()

    if (!res.ok) {
      errorMsg.value = data.error
    } else {
      successMsg.value = data.message + ' Redirecting to login…'
      setTimeout(() => router.push('/login'), 1500)
    }
  } catch {
    errorMsg.value = 'Cannot connect to server. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>