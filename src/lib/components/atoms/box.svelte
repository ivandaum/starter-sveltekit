<script lang="ts">
	import type { BoxProps } from '$lib/types/component';

	let { node = $bindable(), ...props }: BoxProps = $props();
</script>

<svelte:element
	this={props.type || 'div'}
	bind:this={node}
	class={[
		'box',
		props.class,
		{
			center: props.center,
			height: props.height,
			width: props.width,
			justify: props.justify,
			absolute: props.absolute
		}
	]}
>
	{@render props.children?.()}
</svelte:element>

<style lang="scss">
	.box {
		display: flex;
		position: relative;

		&.center {
			justify-content: center;
			align-items: center;
		}

		&.height {
			height: 100%;
		}

		&.width {
			width: 100%;
		}

		&.justify {
			justify-content: space-between;
		}

		&.absolute {
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
