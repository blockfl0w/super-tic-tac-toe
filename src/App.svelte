<script lang="ts">
  import Login from './lib/pages/login.svelte'
  import Home from '$lib/pages/home.svelte'
  import { Router, Link, Route } from 'svelte-routing'
  import { user, pb } from '$lib/pocketbase.svelte'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js'
  import * as Avatar from '$lib/components/ui/avatar/index.js'
  import Background from '$lib/components/background.svelte'
  import Create from '$lib/pages/create.svelte'
  import CreateNoughtsAndCrosses from '$lib/pages/createNoughtsAndCrosses..svelte'
  import Join from '$lib/pages/join.svelte'
  import PlayNoughtsAndCrosses from '$lib/pages/playNoughtsAndCrosses.svelte'
  import Sonner from '$lib/components/ui/sonner/sonner.svelte'

  async function signOut() {
    pb.authStore.clear()
  }
</script>

<Router>
  <div>
    <Route path="/login"><Login /></Route>
    <Route path="/create"><Create /></Route>
    <Route path="/create/noughtsAndCrosses"><CreateNoughtsAndCrosses /></Route>
    <Route path="/join"><Join /></Route>
    <Route path="/play/noughtsAndCrosses"><PlayNoughtsAndCrosses /></Route>

    <Route path="/"><Home /></Route>
  </div>
  <main>
    <Sonner richColors position="bottom-left" />

    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="absolute bottom-8 right-16 z-50">
        <Avatar.Root class="w-16 h-16">
          {#if user.data !== null}
            <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
            <Avatar.Fallback class="uppercase bg-neutral-300">
              {#if user.data.name === 'Guest'}
                GU
              {:else}
                {user.data.username[0] + user.data.username[1]}
              {/if}
            </Avatar.Fallback>
          {:else}
            <Avatar.Fallback class="uppercase bg-neutral-300"
              >GU</Avatar.Fallback
            >
          {/if}
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {#if user.data !== null && user.data.name !== 'Guest'}
            <DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Profile</DropdownMenu.Item>
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item class="text-red-500 hover:!text-red-600"
              ><button on:click={signOut}>Log out</button></DropdownMenu.Item
            >
          {:else}
            <DropdownMenu.GroupHeading>Guest account</DropdownMenu.GroupHeading>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Log in</DropdownMenu.Item>
            <DropdownMenu.Item>Register</DropdownMenu.Item>
            <DropdownMenu.Item class="text-red-500 hover:!text-red-600">
              <button on:click={signOut}>Delete account</button>
            </DropdownMenu.Item>
          {/if}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </main>
  <Background team="blue" />
</Router>

<style>
  :global(body) {
    overflow: hidden;
  }
</style>
