<template>
  <header class="site-header">
    <div class="container header-inner">
      <RouterLink to="/" class="brand">History Hub</RouterLink>

      <div class="search-container" ref="searchContainer">
        <input
          type="text"
          id="search-input"
          placeholder="Search pages..."
          v-model="searchQuery"
        />
        <div id="search-results" v-if="searchResults.length > 0">
          <RouterLink
            v-for="page in searchResults"
            :key="page.name"
            :to="page.route"
          >
            {{ page.name }}
          </RouterLink>
        </div>
        <div id="search-results" v-else-if="searchQuery.length > 0">
          <div>No matches found</div>
        </div>
      </div>

      <nav class="main-nav">
        <RouterLink to="/about">About Us</RouterLink>
        <RouterLink to="/login">Log In</RouterLink>
        <RouterLink to="/review">Review</RouterLink>
      </nav>

      <!-- Account status — pushed to far right via margin-left: auto -->
      <RouterLink v-if="!currentUser" to="/login" class="account-status not-logged-in">
        Not logged in
      </RouterLink>
      <span v-else class="account-status logged-in">
        {{ currentUser }}
      </span>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { userInfo } from '@/userInfo.js'

const { currentUser } = userInfo()

const pages = [
  { name: 'Home',                    route: '/' },
  { name: 'About Us',               route: '/about' },
  { name: 'Log In',                 route: '/login' },
  { name: 'Review',                 route: '/review' },
  { name: 'Ancient Civilizations',  route: '/ancient' },
  { name: 'Renaissance & Early Modern', route: '/renaissance' },
  { name: 'Industrial Revolution',  route: '/industrial' },
  { name: 'World Wars',             route: '/world-wars' },
  { name: 'Concurrent Events', url: '' }, //No URL will be provided, a fodder result
  { name: 'Modern Era', url: '' } //No URL will be provided, a fodder result
]

const searchQuery = ref('')

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  return pages.filter(p =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const searchContainer = ref(null)

// CClear the search query when clicking outside the search container
function handleOutsideClick(e) {
  if (searchContainer.value && !searchContainer.value.contains(e.target)) {
    searchQuery.value = ''
  }
}

// Avoid memory leaks by adding/removing event listener on component mount/unmount
onMounted(() => document.addEventListener('click', handleOutsideClick))
onUnmounted(() => document.removeEventListener('click', handleOutsideClick))
</script>
