<script lang="ts">
	import '$lib/styles/index.scss';

	import { EventManager } from '$lib/utils/managers/event-manager';

	import { onMount } from 'svelte';

	import { isTablet, windowHeight, windowWidth } from '$lib/stores/site.svelte';

	import Header from '$lib/components/organisms/header.svelte';

	let { children } = $props();

	const onResize = () => {
		const height = window.innerHeight;
		const width = window.innerWidth;

		$isTablet = width < 1024;
		$windowWidth = width;
		$windowHeight = height;

		console.log('resize', width, height);
	};

	onMount(() => {
		onResize();

		const event = EventManager.getInstance();
		const eventId = event.add('resize', onResize);

		return () => {
			event.remove(eventId);
		};
	});
</script>

<div class="page">
	<Header />
	{@render children()}
</div>

<style lang="scss">
	.page {
		min-height: 100vh;
		width: 100%;
	}
</style>
