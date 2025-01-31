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
	onShow?: () => void;
	onHide?: () => void;
	proximity?: null | number;
};

export type Perspective3dReturn = {
	enable: () => void;
	disable: () => void;
};

export type EventManagerCallback = (event: any | undefined) => void;
export type EventManagerCallbackID = string;
export type EventManagerEventName = keyof WindowEventMap;
