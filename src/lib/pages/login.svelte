<script lang="ts">
  import { user, pb } from '../pocketbase.svelte'
  let password = $state('')
  let email = $state('')

  async function login(e: Event) {
    e.preventDefault()
    await pb.collection('users').authWithPassword(email, password)
  }
</script>

{#if user.data !== null}
  <p>Welcome {user.data.username}!</p>
{:else}
  <form onsubmit={login}>
    <label for="email">Email</label>
    <input id="email" placeholder="user@example.com" bind:value={email} />
    <label for="password">Password</label>
    <input id="password" type="password" bind:value={password} />
    <button>Login</button>
  </form>
{/if}
