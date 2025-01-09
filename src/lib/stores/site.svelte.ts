import type { SiteConfig } from '$lib/types/store';

export const SiteStore = $state<SiteConfig>({
	title: ''
});
