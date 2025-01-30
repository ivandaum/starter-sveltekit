<script lang="ts">
	import type { TextProps } from '$lib/types/component';

	import { classNames } from '$lib/utils/classnames';

	let { node = $bindable(), align, title, ...props }: TextProps = $props();

	const classList = $derived([classNames(align, `align-${align}`), classNames(title, 'title')]);
</script>

<svelte:element this={props.type || 'p'} bind:this={node} class={['t', classList, props.class]}>
	{@render props.children?.()}
</svelte:element>

<style lang="scss">
	.t {
		font-size: var(--font-size-text);
		color: inherit;

		:global {
			b {
				font-weight: var(--font-weight-bold);
			}

			strong {
				font-weight: var(--font-weight-bold);
			}

			a {
				color: inherit;
				text-decoration: underline;
			}
		}
	}

	.t.title {
		font-size: var(--font-size-title);
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
