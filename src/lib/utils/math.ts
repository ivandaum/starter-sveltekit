export const normalize = (value: number, min: number, max: number) => {
	return (value - min) / (max - min);
};

export const round = (value: number, decimals: number = 2) => {
	return parseFloat(Number(value).toFixed(decimals));
};

export const clamp = (value: number, min: number, max: number) => {
	return Math.min(max, Math.max(min, value));
};

export const lerp = (min: number, max: number, t: number) => {
	return min * (1 - t) + max * t;
};

export const uniqueID = () => {
	return crypto ? crypto.randomUUID() : Math.random().toString(16).slice(2);
};
