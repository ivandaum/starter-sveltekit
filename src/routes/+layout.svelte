<script lang="ts">
	import '$lib/styles/css/index.scss';

	import { onMount } from 'svelte';

	import { tablet, windowHeight, windowWidth, mouse } from '$lib/stores/site.svelte';

	import { EventManager } from '$lib/utils/managers/event-manager';
	import { isTablet } from '$lib/utils/media-query';

	import Header from '$lib/components/organisms/header.svelte';
	import Footer from '$lib/components/organisms/footer.svelte';

	let { children } = $props();

	const onResize = () => {
		$windowWidth = window.innerWidth;
		$windowHeight = window.innerHeight;

		$tablet = isTablet();
	};

	const onMouseMove = (event: MouseEvent) => {
		$mouse = [event.clientX, event.clientY];
	};

	onMount(() => {
		onResize();

		const event = EventManager.getInstance();
		const events = [event.add('resize', onResize), event.add('mousemove', onMouseMove)];

		return () => {
			events.forEach((id) => event.remove(id));
		};
	});
</script>

<div class="page">
	<Header />
	{@render children()}
	<Footer />
</div>

<style lang="scss">
	@use '$lib/styles/functions';

	.page {
		min-height: functions.vh(100);
		width: 100%;
	}
</style>
