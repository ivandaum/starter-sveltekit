<script lang="ts">
	import '$lib/styles/index.scss';

	import { onMount } from 'svelte';

	import { isTablet, windowHeight, windowWidth, mouse } from '$lib/stores/site.svelte';

	import Header from '$lib/components/organisms/header.svelte';

	let { children } = $props();

	const onResize = () => {
		const height = window.innerHeight;
		const width = window.innerWidth;
		document.documentElement.style.setProperty('--vh', `${height * 0.01}px`);

		$isTablet = width < 1024;
		$windowWidth = width;
		$windowHeight = height;
	};

	const onMouseMove = ({ clientX, clientY }: { clientX: number; clientY: number }) => {
		$mouse = [clientX, clientY];
	};

	onMount(() => {
		onResize();

		window.addEventListener('resize', onResize);
		window.addEventListener('mousemove', onMouseMove);

		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('mousemove', onMouseMove);
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
