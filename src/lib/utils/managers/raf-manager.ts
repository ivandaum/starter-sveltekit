class RAFManager {
	static instance: RAFManager | undefined;

	isRunning: boolean = false;
	callbacks: Map<string, (timestamp: number) => void> = new Map();

	constructor() {
		if (RAFManager.instance) {
			return RAFManager.instance;
		}

		RAFManager.instance = this;

		this.callbacks = new Map();
		this.isRunning = false;

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
		if (!this.isRunning) {
			this.isRunning = true;
			requestAnimationFrame(this.update);
		}
	}

	stop() {
		this.isRunning = false;
	}

	update(timestamp: number) {
		if (!this.isRunning) return;

		this.callbacks.forEach((callback) => callback(timestamp));

		requestAnimationFrame(this.update);
	}
}

export default RAFManager;
