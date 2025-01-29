export type ComponentProps = {
	class?: object | string | string[];
	children?: any;
	type?: string;
	node?: HTMLElement;
};

export type BoxProps = ComponentProps & {
	height?: 'fit' | true;
	width?: boolean;
	grid?: boolean;
	x?: 'start' | 'center' | 'justify' | 'end' | true;
	y?: 'start' | 'center' | 'justify' | 'end' | true;
	position?: 'relative' | 'absolute' | 'fixed';
};

export type RectProps = {
	x: number;
	y: number;
	width: number;
	height: number;
};
