<script lang="ts">
	import type { BoxProps } from '$lib/types/component';

	const props: BoxProps = $props();
</script>

<div
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
</div>

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
