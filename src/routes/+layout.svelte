<script>
	import '$lib/styles/index.scss';

	let { children } = $props();
</script>

<div class="page">
	{@render children()}
</div>

<style lang="scss">
	.page {
		min-height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
