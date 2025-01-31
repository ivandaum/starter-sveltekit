<script lang="ts">
	import { onMount } from 'svelte';

	import { tablet } from '$lib/stores/site.svelte';

	import { perspective3d } from '$lib/utils/animations/perspective-3d';

	import SvelteIcon from '$lib/assets/icons/svelte-logo.svg?raw';

	import Box from '$lib/components/atoms/box.svelte';
	import Text from '$lib/components/atoms/text.svelte';

	let elementRef: HTMLDivElement;

	onMount(() => {
		const animation = perspective3d({ container: elementRef });
		animation.enable();

		return () => {
			animation.disable();
		};
	});
</script>

<div class="welcome">
	<Box class="content" x y position="absolute">
		<Box bind:node={elementRef} class="block" x y column>
			{@html SvelteIcon}
			<Text title={!$tablet} align="center" class="text">Svelte 5 starter</Text>
		</Box>
	</Box>
</div>

<style lang="scss">
	@use '$lib/styles/mixins';
	@use '$lib/styles/functions';
	@use '$lib/styles/medias';

	$translate: 0.5rem;

	:root {
		--grey: #ecf3f9;
	}

	:global(body) {
		background-color: var(--grey);
	}

	.welcome :global {
		color: var(--black);

		.content {
			height: functions.vh(100);
			width: 100%;
			overflow: hidden;

			@include medias.tablet {
				padding: 2rem;
			}
		}

		.block {
			width: functions.vh(25);
			height: auto;
			border-radius: 2rem;
			padding: 5rem 3rem;
			background: var(--color-white);
			box-shadow: 0 0 5rem rgba(0, 0, 0, 0.1);
			transform-style: preserve-3d;
			transform-origin: center center;
			transform: translate3d(
					calc(#{-1 * $translate} * var(--tx)),
					calc(#{-1 * $translate} * var(--ty)),
					0px
				)
				perspective(500px) rotateY(calc(var(--tx) * 5deg)) rotateX(calc(var(--ty) * -5deg));

			@include medias.tablet {
				width: 100%;
				padding: 5rem 2rem;
			}
		}

		.text {
			margin-top: 3rem;

			@include medias.tablet {
				margin-top: 5rem;
			}
		}

		svg {
			width: 50%;
			height: auto;
			transform-origin: center center;
			transform: translate3d(
				calc(var(--tx) * #{-1 * $translate}),
				calc(var(--ty) * #{-1 * $translate}),
				0px
			);

			@include medias.tablet {
				width: 35%;
			}
		}
	}
</style>
