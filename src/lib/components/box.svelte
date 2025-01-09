<script lang="ts">
	import type { BoxProps } from '$lib/types/components';

	const props: BoxProps = $props();
</script>

<div class={['box', props.class, { center: props.center }]}>
	{@render props.children?.()}
</div>

<style lang="scss">
	.box {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.box.center {
		justify-content: center;
		align-items: center;
	}
</style>
