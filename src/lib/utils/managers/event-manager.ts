import { uniqueID } from '$lib/utils/math';

type Callback = () => void;
type CallbackID = string;
type EventName = string;

export class EventManager {
	static instance: EventManager | undefined;

	events: Map<EventName, Array<CallbackID>> = new Map();
	callbacks: Map<CallbackID, Callback> = new Map();

	constructor() {
		if (EventManager.instance) {
			return EventManager.instance;
		}

		EventManager.instance = this;
		this.callbacks = new Map();
	}

	static getInstance() {
		if (!EventManager.instance) {
			EventManager.instance = new EventManager();
		}

		return EventManager.instance;
	}

	#getEvent(eventName: EventName): Array<CallbackID> {
		const event = this.events.get(eventName) as Array<CallbackID>;

		if (!event) {
			return [];
		}

		return event;
	}

	#createEvent(eventName: EventName) {
		const c = () => {
			const ids = this.events.get(eventName);
			ids?.forEach((id: CallbackID) => this.callbacks.get(id)?.());
		};

		window.addEventListener(eventName, c);
		this.events.set(eventName, []);
	}

	add(eventName: EventName, callback: () => void): CallbackID {
		if (!this.events.has(eventName)) {
			this.#createEvent(eventName);
		}

		const callbackId = uniqueID();
		this.callbacks.set(callbackId, callback);

		const event = this.#getEvent(eventName);
		this.events.set(eventName, event.concat(callbackId));

		return callbackId;
	}

	remove(callbackId: CallbackID) {
		this.callbacks.delete(callbackId);

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
