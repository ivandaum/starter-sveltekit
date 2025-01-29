<script lang="ts">
	import type { BoxProps } from '$lib/types/component';
	import { isString } from '$lib/utils/test';

	let {
		node = $bindable(),
		x,
		y,
		height,
		width,
		position = 'relative',
		...props
	}: BoxProps = $props();

	const classList: string[] = [];

	const add = (n: string) => classList.push(n);

	const addIfString = (prop: string | boolean, className: string, fallback: string) => {
		return add(isString(prop) ? className : fallback);
	};

	x && addIfString(x, `x-${x}`, 'x-center');
	y && addIfString(y, `y-${y}`, 'y-center');

	height && addIfString(height, `h-${height}`, 'h-100');
	width && add('w-100');

	add(position);
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
