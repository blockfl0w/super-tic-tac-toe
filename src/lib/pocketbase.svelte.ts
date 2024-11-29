import PocketBase from 'pocketbase'
import { toast } from 'svelte-sonner'

export const pb = new PocketBase('http://127.0.0.1:8090/')

export let user = $state({ data: pb.authStore.record })

pb.authStore.onChange((record) => {
  console.log('authStore.onChange', pb.authStore.record)
  user.data = pb.authStore.record
})

export async function generateDummyAccount() {
  if (pb.authStore.isValid === false) {
    pb.authStore.clear()

    // Make a dummy account for guest users
    try {
      let username = crypto.randomUUID()
      await pb.collection('users').create({
        username: username,
        password: 'Password',
        passwordConfirm: 'Password',
        name: 'Guest',
        guest: true,
      })

      await pb.collection('users').authWithPassword(username, 'Password')

      toast(
        'You are currently on a guest account to save your data please create an account',
      )
    } catch (e) {
      console.error(e)
    }
  }
}

generateDummyAccount()
