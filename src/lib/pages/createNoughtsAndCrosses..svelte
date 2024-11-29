<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import Link from '$lib/components/link.svelte'
  import { Checkbox } from '$lib/components/ui/checkbox/index.js'
  import { generateGameId } from '$lib/utils'
  import { generateDummyAccount, pb, user } from '$lib/pocketbase.svelte'
  import { toast } from 'svelte-sonner'

  let checked = false

  async function createGame(e: Event) {
    e.preventDefault()

    const gameId = generateGameId()
    const liveCursors = checked

    try {
      if (user.data === null) {
        toast.error('User is not logged in. Click here to log in as a guest', {
          action: {
            label: 'Log in',
            onClick: async () => {
              await generateDummyAccount()
            },
          },
        })

        throw new Error('User is not logged in')
      }
      await pb.collection('noughtAndCrossesGames').create({
        gameID: gameId,
        boardState: '000000000',
        liveCursors: liveCursors,
        gameStarted: false,
        player1ID: user.data.id,
      })

      toast.success('Game created successfully redirecting to game...')

      setTimeout(() => {
        window.location.href = `/play/noughtsAndCrosses?code=${gameId}`
      }, 2000)
    } catch (error) {
      toast.error('Failed to create game. Check the console for more details')
      console.error(error)
    }
  }
</script>

<div
  class="w-screen h-screen flex justify-center items-center absolute top-0 z-10"
>
  <main
    class="w-2/4 bg-white px-4 py-4 flex flex-col gap-4 items-center rounded-lg"
  >
    <h1 class="text-2xl font-bold text-center">
      Create Noughts and Crosses game
    </h1>
    <form onsubmit={createGame}>
      <label for="liveCursors" class="flex items-center gap-2 mt-0">
        <Checkbox bind:checked name="liveCursors" id="liveCursors" />
        Enable live cursors?
      </label>

      <Button type="submit">Create</Button>
    </form>
  </main>
</div>
