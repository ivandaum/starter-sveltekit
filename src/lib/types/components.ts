export type ComponentProps = {
	class?: object | string | string[];
	children?: any;
};

export type BoxProps = ComponentProps & {
	center: boolean;
};
