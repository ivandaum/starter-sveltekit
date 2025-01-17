export type ObserverProps = {
	element: HTMLElement;
	onShow: () => void;
	onHide?: () => void;
	threshold?: number[];
	rootMargin?: string;
};

export type Perspective3dProps = {
	container: HTMLElement;
	elements: HTMLElement[];
	onShow?: () => void;
	onHide?: () => void;
	proximity?: boolean;
	proximityLimit?: number;
};
