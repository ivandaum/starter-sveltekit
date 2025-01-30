<script lang="ts">
	import type { BoxProps } from '$lib/types/component';

	import { classNames } from '$lib/utils/classnames';

	let {
		node = $bindable(),
		x,
		y,
		height,
		width,
		position = 'relative',
		column,
		...props
	}: BoxProps = $props();

	const classList = $derived([
		classNames(x, `x-${x}`, 'x-center'),
		classNames(y, `y-${y}`, 'y-center'),
		classNames(height, `h-${height}`, 'h-100'),
		classNames(width, 'w-100'),
		classNames(column, 'column'),
		position
	]);
</script>

<svelte:element this={props.type || 'div'} bind:this={node} class={['b', classList, props.class]}>
	{@render props.children?.()}
</svelte:element>

<style lang="scss">
	.b {
		display: flex;

		&.relative {
			position: relative;
		}

		&.fixed {
			position: fixed;
		}

		&.absolute {
			position: absolute;
			top: 0;
			left: 0;
		}

		&.column {
			flex-direction: column;
		}
	}

	// sizes
	.b.h {
		&-100 {
			height: 100%;
		}

		&-fit {
			height: fit-content;
		}
	}

	.b.w {
		&-100 {
			width: 100%;
		}
	}

	// alignment
	.b.x {
		&-center {
			justify-content: center;
		}

		&-start {
			justify-content: flex-start;
		}

		&-end {
			justify-content: flex-end;
		}
	}

	.b.y {
		&-center {
			align-items: center;
		}

		&-start {
			align-items: flex-start;
		}

		&-end {
			align-items: flex-end;
		}
	}
</style>
