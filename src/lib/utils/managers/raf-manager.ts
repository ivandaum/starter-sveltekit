class RAFManager {
	static instance: RAFManager | undefined;

	running: boolean = false;
	callbacks: Map<string, (timestamp: number) => void> = new Map();

	constructor() {
		if (RAFManager.instance) {
			return RAFManager.instance;
		}

		RAFManager.instance = this;

		this.callbacks = new Map();
		this.running = false;

		this.update = this.update.bind(this);
	}

	static getInstance() {
		if (!RAFManager.instance) {
			RAFManager.instance = new RAFManager();
		}

		return RAFManager.instance;
	}

	add(id: string, callback: () => void) {
		if (!this.callbacks.has(id)) {
			this.callbacks.set(id, callback);
			this.startIfNeeded();
		}
	}

	remove(id: string) {
		this.callbacks.delete(id);

		if (this.callbacks.size === 0) {
			this.stop();
		}
	}

	startIfNeeded() {
		if (!this.running) {
			this.running = true;
			requestAnimationFrame(this.update);
		}
	}

	stop() {
		this.running = false;
	}

	update(timestamp: number) {
		if (!this.running) return;

		this.callbacks.forEach((callback) => callback(timestamp));

		requestAnimationFrame(this.update);
	}
}

export default RAFManager;
