import type {
	EventManagerCallback,
	EventManagerCallbackID,
	EventManagerEventName
} from '$lib/types/utils';

import { uniqueID } from '$lib/utils/math';

export class EventManager {
	static instance: EventManager | undefined;

	events: Map<EventManagerEventName, Array<EventManagerCallbackID>> = new Map();
	EventManagerCallbacks: Map<EventManagerCallbackID, EventManagerCallback> = new Map();

	constructor() {
		if (EventManager.instance) {
			return EventManager.instance;
		}

		EventManager.instance = this;
		this.EventManagerCallbacks = new Map();
	}

	static getInstance() {
		if (!EventManager.instance) {
			EventManager.instance = new EventManager();
		}

		return EventManager.instance;
	}

	#getEvent(eventName: EventManagerEventName): Array<EventManagerCallbackID> {
		const event = this.events.get(eventName) as Array<EventManagerCallbackID>;

		if (!event) {
			return [];
		}

		return event;
	}

	#createEvent(eventName: EventManagerEventName) {
		const c = (event: Event) => {
			const ids = this.events.get(eventName);
			ids?.forEach((id: EventManagerCallbackID) => this.EventManagerCallbacks.get(id)?.(event));
		};

		window.addEventListener(eventName, c);
		this.events.set(eventName, []);
	}

	add(eventName: EventManagerEventName, callback: EventManagerCallback): EventManagerCallbackID {
		if (!this.events.has(eventName)) {
			this.#createEvent(eventName);
		}

		const id = uniqueID();
		this.EventManagerCallbacks.set(id, callback);

		const event = this.#getEvent(eventName);
		this.events.set(eventName, event.concat(id));

		return id;
	}

	remove(callbackId: EventManagerCallbackID) {
		this.EventManagerCallbacks.delete(callbackId);

		const events = this.events.entries().toArray();

		for (let i = 0; i < events.length; i++) {
			const [eventName, event] = events[i];

			for (let j = 0; j < event.length; j++) {
				const id = event[j];
				if (id === callbackId) {
					event.splice(j, 1);
					this.events.set(eventName, event);
					break;
				}
			}
		}
	}
}
