import { get } from 'svelte/store';

import type { RectProps, Perspective3dProps, EventManagerCallbackID } from '$lib/types/utils';

import { mouse, isTablet, windowHeight, windowWidth } from '$lib/stores/site.svelte';

import { EventManager } from '$lib/utils/managers/event-manager';
import RAFManager from '$lib/utils/managers/raf-manager';

import { getScrollTop, observer } from '$lib/utils/dom';
import { normalize, round, uniqueID } from '$lib/utils/math';

export const perspective3d = ({
	container,
	elements = [container],
	proximity = null,
	onShow,
	onHide
}: Perspective3dProps) => {
	const eventManager = EventManager.getInstance();
	const rafManager = RAFManager.getInstance();

	let observerId: IntersectionObserver;
	let eventId: EventManagerCallbackID;

	const rafId = uniqueID();
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
				if (tx < proximity && tx > -proximity && ty < proximity && ty > -proximity) {
					dx = tx;
					dy = ty;
				}
			} else {
				dx = Math.max(-1, Math.min(1, round(tx)));
				dy = Math.max(-1, Math.min(1, round(ty)));
			}

			elementSpeeds[i][0] += (dx - elementSpeeds[i][0]) * 0.05;
			elementSpeeds[i][1] += (dy - elementSpeeds[i][1]) * 0.05;

			elements[i].style.setProperty('--tx', round(elementSpeeds[i][0]).toString());
			elements[i].style.setProperty('--ty', round(elementSpeeds[i][1]).toString());
		});
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
		enable: () => {
			onResize();
			eventId = eventManager.add('resize', onResize);

			observerId = observer({
				element: container,
				onShow: () => {
					if (onShow) onShow();
					rafManager.add(rafId, update);
				},
				onHide: () => {
					if (onHide) onHide();
					rafManager.remove(rafId);
				}
			});
		},
		disable: () => {
			if (observerId) {
				observerId.disconnect();
			}

			if (rafId) rafManager.remove(rafId);

			if (eventId) eventManager.remove(eventId);
		}
	};
};
