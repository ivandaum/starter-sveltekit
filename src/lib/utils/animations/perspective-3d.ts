import { mouse, isTablet, windowHeight, windowWidth } from '$lib/stores/site.svelte';
import { get } from 'svelte/store';

import type { Perspective3dProps } from '$lib/types/utils';
import type { RectProps } from '$lib/types/component';

import { getScrollTop, observer } from '$lib/utils/dom';
import { normalize, round } from '$lib/utils/math';

export const perspective3d = ({
	container,
	elements,
	proximity = false,
	proximityLimit = 1.5,
	onShow,
	onHide
}: Perspective3dProps) => {
	let raf = 0,
		observerId: IntersectionObserver;

	const elementRects: RectProps[] = [];
	const elementSpeeds: [number, number][] = [];

	const update = () => {
		const scrollTop = getScrollTop();

		let mouseX = get(mouse)[0];
		let mouseY = get(mouse)[1] + scrollTop;

		if (get(isTablet)) {
			mouseX = get(windowWidth) * 0.5;
			mouseY = scrollTop + get(windowHeight) * 0.5;
		}

		elementRects.forEach(({ x, y, width, height }, i) => {
			const endX = width + x;
			const endY = height + y;

			// on 0 to 1, where is the mouse
			const tx = (normalize(mouseX, x, endX) - 0.5) * 2;
			const ty = (normalize(mouseY, y, endY) - 0.5) * 2;

			// clamp to 1 max

			let dx = 0,
				dy = 0;
			if (proximity) {
				if (
					tx < proximityLimit &&
					tx > -proximityLimit &&
					ty < proximityLimit &&
					ty > -proximityLimit
				) {
					dx = tx;
					dy = ty;
				}
			} else {
				dx = Math.max(-1, Math.min(1, round(tx)));
				dy = Math.max(-1, Math.min(1, round(ty)));
			}

			elementSpeeds[i][0] += (dx - elementSpeeds[i][0]) * 0.05;
			elementSpeeds[i][1] += (dy - elementSpeeds[i][1]) * 0.05;

			elements[i].style.setProperty('--tx', elementSpeeds[i][0].toString());
			elements[i].style.setProperty('--ty', elementSpeeds[i][1].toString());
		});

		raf = requestAnimationFrame(() => update());
	};

	const onResize = () => {
		const scrollTop = getScrollTop();

		elements.forEach((el, i) => {
			const rect = el.getBoundingClientRect();
			const y = rect.top + scrollTop;
			const x = rect.left;
			const width = rect.width;
			const height = rect.height;

			elementSpeeds[i] = [0, 0];
			elementRects[i] = { x, y, width, height };
		});
	};

	return {
		init: () => {
			onResize();
			window.addEventListener('resize', onResize);

			observerId = observer({
				element: container,
				onShow: () => {
					if (onShow) onShow();
					update();
				},
				onHide: () => {
					if (onHide) onHide();
					cancelAnimationFrame(raf);
				}
			});
		},
		destroy: () => {
			if (observerId) {
				observerId.disconnect();
			}

			if (raf) {
				cancelAnimationFrame(raf);
			}

			window.removeEventListener('resize', onResize);
		}
	};
};
