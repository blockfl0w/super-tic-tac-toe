<script lang="ts">
	import crown from '$lib/icons/crown.svg';
	import { cn } from '$lib/utils';
	import { Wrench } from 'lucide-svelte';
	let {
		profileSrc = 'https://avatars.githubusercontent.com/u/85368721?v=4',
		name = 'Guest',
		owner = false,
		moderator = false,
		timer = 'none',
		timerVal = '00:00',
		team = 'none',
		colorful = false
	}: {
		profileSrc?: string;
		name?: string;
		owner?: boolean;
		moderator?: boolean;
		timer?: 'none' | 'left' | 'right';
		timerVal?: String;
		team?: 'yellow' | 'blue' | 'none';
		colorful?: boolean;
	} = $props();

	let profileBorder = $state('');
	let teamBg = $state('bg-white');
	if (!colorful) {
		if (team === 'yellow') {
			profileBorder = 'border-brand-yellow border-2';
		} else if (team === 'blue') {
			profileBorder = 'border-brand-blue border-2';
		}
	} else {
		if (team === 'yellow') {
			teamBg = 'bg-brand-yellow';
		} else if (team === 'blue') {
			teamBg = 'bg-brand-blue';
		}
	}
</script>

<div class={cn(teamBg, 'flex w-fit items-center gap-6 rounded-full py-2 pl-2 pr-4')}>
	{#if timer == 'left'}
		<h6 class="text-xl text-inherit">{timerVal}</h6>
	{/if}
	<div class="flex items-center gap-2">
		<img
			src={profileSrc}
			alt={`${name}'s profile picture'`}
			class={cn('aspect-square w-8 rounded-full', profileBorder)}
		/>
		<h6 class="text-inherit">{name}</h6>
		{#if owner}
			<div class="flex aspect-square w-8 items-center justify-center rounded-full bg-white">
				<img src={crown} alt="Owner icon" />
			</div>
		{/if}
		{#if moderator}
			<div class="flex aspect-square w-8 items-center justify-center rounded-full bg-white">
				<Wrench fill="#475AFF" color="#475AFF" />
			</div>
		{/if}
	</div>
	{#if timer == 'right'}
		<h6 class="text-xl text-inherit">{timerVal}</h6>
	{/if}
</div>
