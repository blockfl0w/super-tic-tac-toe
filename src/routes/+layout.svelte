<script lang="ts">
	import '../app.css';
	// import PocketBase from 'pocketbase';
	import { onMount, type Snippet } from 'svelte';
	import type { PageData } from './$types';
	import Background from '$lib/components/background.svelte';

	// let pb = new PocketBase('http://pocketbase.blockflow.dev/');

	// let timer: any;

	// onMount(async () => {
	// 	console.log(await pb.collection('users').getFullList());
	// });
	// async function mouseStopped(e: MouseEvent) {
	// 	console.log('Mouse stopped');
	// 	console.log(await pb.collection('users').getOne(data.user.id));
	// }
	// function updateMouse(event: MouseEvent) {
	// 	// Only send mouse update when stopped
	// 	clearTimeout(timer);
	// 	timer = setTimeout(() => {
	// 		mouseStopped(event);
	// 	}, 300);
	// }

	let { children, data }: { children: Snippet; data: PageData } = $props();

	// console.log(data);
</script>

<Background />
<div class="relative left-0 top-0 z-10">
	{@render children()}
</div>

<!-- <svelte:body on:mousemove={updateMouse} /> -->

<style>
	:global(body) {
		overflow-y: hidden;
		overflow-x: hidden;
	}
</style>
