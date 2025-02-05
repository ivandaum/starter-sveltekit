export type ComponentProps = {
	class?: object | string | string[];
	children?: any;
	type?: string;
	node?: HTMLElement;
};

export type BoxProps = ComponentProps & {
	x?: 'start' | 'center' | 'justify' | 'end' | boolean;
	y?: 'start' | 'center' | 'justify' | 'end' | boolean;
	height?: 'fit' | boolean;
	// activable props
	width?: boolean;
	column?: boolean;
	absolute?: boolean;
};

export type TextProps = ComponentProps & {
	align?: 'left' | 'center' | 'right' | 'justify';
	title?: boolean;
};

export type ImageProps = ComponentProps & {
	alt?: string;
	srcset?: {
		src: string;
		width?: number;
	}[];
};
