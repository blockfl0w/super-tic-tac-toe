<script lang="ts">
	import type { PageData } from './$types';
	import * as Select from '$lib/components/ui/select/index.js';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-screen items-center justify-center">
	<main class="flex w-fit flex-col justify-center gap-8 rounded-xl bg-white px-8 py-2">
		<h1>Create game</h1>
		<form>
			<label for="gameMode">Select a game mode</label>
			<div id="gameMode">
				<Select.Root type="single">
					<Select.Trigger class="w-[180px]">Classic</Select.Trigger>
					<Select.Content>
						<Select.Item value="classic">Classic</Select.Item>
						<Select.Item value="timed">Timed ⏳</Select.Item>
						<Select.Item value="timed">Powerups 🚀</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</form>
	</main>
</div>
