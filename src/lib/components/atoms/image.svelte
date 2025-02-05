<script lang="ts">
	import type { ImageProps } from '$lib/types/component';
	import { observer } from '$lib/utils/dom';
	import { onMount } from 'svelte';

	const { alt = '', srcset: srcsetProps = [] }: ImageProps = $props();

	let elementRef: HTMLElement;
	let observerId: IntersectionObserver;

	const dataSrcset = $derived(srcsetProps.map(({ src, width }) => `${src} ${width}w`).join(', '));
	const sizes = $derived(
		srcsetProps
			.map(({ width }, i) =>
				i < srcsetProps.length - 1 ? `(max-width:${width}px) ${width}px` : `${width}px`
			)
			.join(', ')
	);

	let srcset = $state('');

	onMount(() => {
		observerId = observer({
			element: elementRef,
			onShow: () => {
				srcset = dataSrcset;
			}
		});

		return () => {
			observerId.disconnect();
		};
	});
</script>

<img {alt} bind:this={elementRef} {srcset} {sizes} data-srcset={dataSrcset} />

<style lang="scss">
</style>
