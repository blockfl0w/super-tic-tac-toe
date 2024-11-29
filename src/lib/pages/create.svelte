<script lang="ts">
  import Link from '$lib/components/link.svelte'
</script>

<div
  class="w-screen h-screen flex justify-center items-center absolute top-0 z-10"
>
  <main
    class="w-2/4 bg-white px-4 py-4 flex flex-col gap-4 items-center rounded-lg"
  >
    <h1 class="text-2xl font-bold text-center">Create a game</h1>
    <Link href="/create/noughtsAndCrosses">Noughts and crosses</Link>
    <Link href="/create/superTicTacToe" team="blue">Super tic tac toe</Link>
  </main>
</div>
