import { pb } from '@/services/pocketbase'
import { ref, reactive } from 'vue'

export function useUser(fetchUsers: () => Promise<void>) {
  // STATE
  const initialForm = {
    username: '',
    email: '',
    emailVisibility: true,
    password: '',
    passwordConfirm: '',
    name: ''
  }

  const formUser = reactive({
    ...initialForm
  })
  const isShowPopupAddUser = ref(false)

  // FUNCTION
  function showPopupUser() {
    isShowPopupAddUser.value = true
  }
  function resetForm() {
    Object.assign(formUser, initialForm)
  }
  async function onFormSubmit() {
    console.log('Form object', formUser)

    try {
      const result = await pb.collection('users').create(formUser)
      console.log('result: ', result)
      isShowPopupAddUser.value = false
      resetForm()
      await fetchUsers()
    } catch (err) {
      console.log('Error ', err)
    }
  }

  return {
    formUser,
    isShowPopupAddUser,
    onFormSubmit,
    showPopupUser
  }
}
