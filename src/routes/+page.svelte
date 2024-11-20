<script>
	import Background from '$lib/components/background.svelte';
	import ProfileCard from '$lib/components/profileCard.svelte';
</script>

<!-- <script lang="ts">
	interface Cell {
		squares: boolean | undefined[];
	}
	interface Board {
		cells: Cell[];
	}

	let boardState: undefined | boolean[] = $state([
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		],
		[
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined
		]
	]);

	function setCell(e: MouseEvent, value: boolean) {
		const cell = Number((e.target as HTMLElement).dataset.cell);
		const atom = Number((e.target as HTMLElement).dataset.atom);
		boardState[cell][atom] = value;
	}
</script>

{#snippet item(value: boolean | undefined, cell: number, atom: number)}
	<button
		class="aspect-square w-full bg-white"
		data-cell={cell}
		data-atom={atom}
		onclick={(e) => setCell(e, true)}
		ondblclick={(e) => setCell(e, false)}
	>
		{#if value === true}
			X
		{:else if value === false}
			O
		{:else}
			&nbsp;
		{/if}
	</button>
{/snippet}

<div class="grid w-[80vh] grid-cols-3 gap-2 bg-blue-400">
	{#each boardState as cell, i}
		<div class="grid aspect-square grid-cols-3 gap-1 bg-black">
			{#each cell as atom, j}
				{@render item(atom, i, j)}
			{/each}
		</div>
	{/each}
</div> -->

<div class="flex h-screen items-center justify-center">
	<main class="flex w-fit flex-col justify-center gap-8 rounded-xl bg-white px-8 py-2">
		<h1>Blockflow Games</h1>
		<a href="/create" class="bg-brand-yellow rounded-lg px-8 py-2 font-semibold">Create a game</a>
		<a href="/join" class="bg-brand-blue rounded-lg px-8 py-2 text-center font-semibold text-white"
			>Join a game
		</a>
	</main>
</div>
