export type ComponentProps = {
	class?: object | string | string[];
	children?: any;
	type?: string;
	node?: HTMLElement;
};

export type BoxProps = ComponentProps & {
	height?: 'fit' | boolean;
	width?: boolean;
	grid?: boolean;
	column?: boolean;
	x?: 'start' | 'center' | 'justify' | 'end' | boolean;
	y?: 'start' | 'center' | 'justify' | 'end' | boolean;
	position?: 'relative' | 'absolute' | 'fixed';
};

export type TextProps = ComponentProps & {
	align?: 'left' | 'center' | 'right' | 'justify';
	title?: boolean;
};
