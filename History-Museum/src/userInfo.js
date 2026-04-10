import { ref } from 'vue'

// same ref for all users
const currentUser = ref(null)

export function userInfo() {
  function setUser(email) {
    currentUser.value = email
  }

  function clearUser() {
    currentUser.value = null
  }

  return { currentUser, setUser, clearUser }
}