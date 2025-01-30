export type RectProps = {
	x: number;
	y: number;
	width: number;
	height: number;
};

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

export type EventManagerCallback = (event: any | undefined) => void;
export type EventManagerCallbackID = string;
export type EventManagerEventName = keyof WindowEventMap;
