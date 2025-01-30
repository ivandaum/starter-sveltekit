<script lang="ts">
	import type { TextProps } from '$lib/types/component';

	import { classNames } from '$lib/utils/classnames';

	let { node = $bindable(), align, ...props }: TextProps = $props();

	const { classList, validate } = classNames();

	validate(align, `align-${align}`);
</script>

<svelte:element this={props.type || 'p'} bind:this={node} class={['t', classList, props.class]}>
	{@render props.children?.()}
</svelte:element>

<style lang="scss">
	.t {
		font-size: inherit;
		color: inherit;

		:global {
			b {
				font-weight: bold;
			}

			strong {
				font-weight: bold;
			}
			a {
				color: inherit;
				text-decoration: underline;
			}
		}
	}

	.t.align {
		&-left {
			text-align: left;
		}
		&-center {
			text-align: center;
		}
		&-right {
			text-align: right;
		}
		&-justify {
			text-align: justify;
		}
	}
</style>
