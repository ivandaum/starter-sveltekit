export const normalize = (value: number, min: number, max: number) => {
	return (value - min) / (max - min);
};

export const round = (value: number, decimals: number = 2) => {
	return parseFloat(Number(value).toFixed(decimals));
};

export const uniqueID = () => crypto.randomUUID();
