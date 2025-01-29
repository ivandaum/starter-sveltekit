<script lang="ts">
	import { onMount } from 'svelte';

	import Box from '$lib/components/atoms/box.svelte';
	import { perspective3d } from '$lib/utils/animations/perspective-3d';

	let elementRef: HTMLDivElement;

	onMount(() => {
		const animation = perspective3d({
			container: elementRef
		});

		animation.init();
	});
</script>

<div class="welcome">
	<Box class="content" center absolute>
		<Box class="block" center bind:node={elementRef}>Svelte starter</Box>
	</Box>
</div>

<style lang="scss">
	@use '$lib/styles/mixins';

	:root {
		--violet-blue: #3b429fff;
		--lavender-floral: #aa7dceff;
		--mimi-pink: #f5d7e3ff;
		--cherry-blossom-pink: #f4a5aeff;
		--china-rose: #a8577eff;
	}

	:global(body) {
		background-color: var(--mimi-pink);
	}

	.welcome :global {
		color: var(--cherry-blossom-pink);
		font-size: 3rem;

		.content {
			height: mixins.vh(100);
			width: 100%;
			overflow: hidden;
		}

		.block {
			aspect-ratio: 1;
			width: mixins.vh(25);
			border-radius: 2rem;
			background: var(--violet-blue);

			// animations
			transform-style: preserve-3d;
			transform-origin: center center;
			transform: perspective(500px) rotateY(calc(var(--tx) * 10deg))
				rotateX(calc(var(--ty) * -10deg));
		}
	}
</style>
