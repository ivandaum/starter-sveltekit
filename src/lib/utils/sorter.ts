export const sortItemsToColumn = (items: any[], columnCount: number = 3) => {
	const columns: any[] = Array.from({ length: columnCount }, () => []);

	items.forEach((item, index) => {
		columns[index % columnCount].push(item);
	});

	return columns;
};
