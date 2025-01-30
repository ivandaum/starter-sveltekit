<script lang="ts">
	import '$lib/styles/index.scss';

	import { EventManager } from '$lib/utils/managers/event-manager';

	import { onMount } from 'svelte';

	import { isTablet, windowHeight, windowWidth, mouse } from '$lib/stores/site.svelte';

	import Header from '$lib/components/organisms/header.svelte';
	import Footer from '$lib/components/organisms/footer.svelte';

	let { children } = $props();

	const onResize = () => {
		const height = window.innerHeight;
		const width = window.innerWidth;

		$isTablet = width < 1024;
		$windowWidth = width;
		$windowHeight = height;
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
	@use '$lib/styles/mixins';

	.page {
		min-height: mixins.vh(100);
		width: 100%;
	}
</style>
