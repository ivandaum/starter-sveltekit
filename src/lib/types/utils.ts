export type ObserverProps = {
	element: HTMLElement;
	onShow: () => void;
	onHide?: () => void;
	threshold?: number[];
	rootMargin?: string;
};

export type Perspective3dProps = {
	container: HTMLElement;
	elements?: HTMLElement[];
	// events
	onShow?: () => void;
	onHide?: () => void;
	// animation purpose
	proximity?: boolean;
	proximityLimit?: number;
};
