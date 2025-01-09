<script>
	import '$lib/styles/index.scss';
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
</script>

<div class="page">
	<Header />
	{@render children()}
</div>

<style lang="scss">
	.page {
		min-height: 100vh;
		width: 100%;
	}
</style>
