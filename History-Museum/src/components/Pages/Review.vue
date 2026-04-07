<template>
  <main class="page-main">
    <div class="container">
      <h1>Site Feedback & Complaints</h1>
      <p>
        Use this page to tell us about issues with the website, content,
        or the research used to cover historical topics.
      </p>

      <section class="page-section">
        <h2>Submit a Complaint</h2>
        <p>
          If you find factual errors, unclear context, or concerns about how
          we presented historical information, we want to hear from you.
        </p>

        <article class="review-card">
          <h3>Research Accuracy</h3>
          <p>
            Report any mistakes in dates, events, sources, or interpretations
            so we can review and correct them.
          </p>
        </article>

        <article class="review-card">
          <h3>Website Experience</h3>
          <p>
            Tell us about navigation problems, broken links, or any part of the
            site that felt confusing.
          </p>
        </article>
      </section>

      <section class="page-section form-section">
        <h2>Contact Us</h2>
        <!-- prevent page refresh -->
        <form @submit.prevent="handleSubmit">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            v-model="name"
          />

          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            v-model="email"
          />

          <label for="issue">Issue Details</label>
          <textarea
            id="issue"
            name="issue"
            rows="5"
            placeholder="Describe the problem or concern"
            v-model="issue"
          ></textarea>

          <!-- error message -->
          <p v-if="errorMsg" style="color: red; margin: 0;">{{ errorMsg }}</p>
          <!-- success message -->
          <p v-if="successMsg" style="color: green; margin: 0;">{{ successMsg }}</p>

          <button type="submit" class="button">Submit Feedback</button>
        </form>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const name  = ref('')
const email = ref('')
const issue = ref('')

const errorMsg   = ref('')
const successMsg = ref('')

function handleSubmit() {
  errorMsg.value   = ''
  successMsg.value = ''

  // No blank
  if (!name.value.trim() || !email.value.trim() || !issue.value.trim()) {
    errorMsg.value = 'Please fill in all fields before submitting.'
    return
  }

  // successful upload
  successMsg.value = `Thank you, ${name.value}! Your feedback has been received.`

  // Clear form
  name.value  = ''
  email.value = ''
  issue.value = ''
}
</script>