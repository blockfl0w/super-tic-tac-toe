<script lang="ts">
  import Button from '$lib/components/button.svelte'
  import Link from '$lib/components/link.svelte'
  import * as InputOTP from '$lib/components/ui/input-otp/'
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'bits-ui'
  import { pb } from '$lib/pocketbase.svelte'

  // Get the url params
  const urlParams = new URLSearchParams(window.location.search)

  const game = $state(urlParams.get('game'))
  let code = $state('')
  let passed = $state(false)
  let table = $state('')

  async function joinGame(e: Event) {
    e.preventDefault()

    console.log(urlParams.get('game'))
    if (urlParams.get('game') === 'noughtsAndCrosses') {
      table = 'noughtAndCrossesGames'
    } else if (urlParams.get('game') === 'superTicTacToe') {
      table = 'superTicTacToeGames'
    }

    console.log(table)
    try {
      await pb
        .collection(table)
        .getFirstListItem(`gameID = '${code.toUpperCase()}'`)

      passed = true
    } catch (error) {
      console.error(error)
    }

    passed
      ? (window.location.href = `/play/${game}?code=${code.toUpperCase}`)
      : ''
  }
</script>

<div
  class="w-screen h-screen flex justify-center items-center absolute top-0 z-10"
>
  <main
    class="w-2/4 bg-white px-4 py-4 flex flex-col gap-4 items-center rounded-lg"
  >
    <h1 class="text-2xl font-bold text-center">Join a game</h1>
    {#if game === null}
      <Link href={`/join?game=noughtsAndCrosses`}>Noughts and crosses</Link>
      <Link href={`/join?game=superTicTacToe`} team="blue"
        >Super tic tac toe</Link
      >
    {:else}
      <div>
        <form class="space-y-4" onsubmit={joinGame}>
          <label for="gameId" class="block"> Game ID </label>
          <InputOTP.Root
            maxlength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            bind:value={code}
          >
            {#snippet children({ cells })}
              <InputOTP.Group>
                {#each cells.slice(0, 3) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
              <InputOTP.Separator />
              <InputOTP.Group>
                {#each cells.slice(3, 6) as cell}
                  <InputOTP.Slot {cell} />
                {/each}
              </InputOTP.Group>
            {/snippet}
          </InputOTP.Root>
          <Button type="submit">Join</Button>
        </form>
      </div>
    {/if}
  </main>
</div>
