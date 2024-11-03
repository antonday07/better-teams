import { onMounted, ref } from 'vue'
import { pb } from '@/services/pocketbase'
export function useLoginForm() {
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)

  function validateForm() {
    if (!email.value) {
      alert('Email is required')
      return false
    }
    if (!password.value) {
      alert('Password is required')
      return false
    }
    return true
  }

  async function handleLogin() {
    try {
      isLoading.value = true
      console.log({ email: email.value, password: password.value })
      // call to api login from pocket base

      const authData = await pb.collection('users').authWithPassword(email.value, password.value)
      console.log(pb.authStore.isValid)
      console.log(pb.authStore.token)
      console.log(pb.authStore.model)
      if (pb.authStore.isValid && pb.authStore.token) {
        alert('Login thành công nhe!')
      }
    } catch (error) {
      console.log('Login failed: ', error)
    } finally {
      isLoading.value = false
    }
  }

  async function onSubmit(event: Event) {
    event.preventDefault()

    if (!validateForm()) return

    await handleLogin()
  }
  return {
    email,
    password,
    isLoading,
    onSubmit
  }
}
