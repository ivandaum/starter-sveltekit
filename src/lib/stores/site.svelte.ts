import type { SiteConfig } from '$lib/types/site';

export const SiteStore = $state<SiteConfig>({
	title: ''
});
