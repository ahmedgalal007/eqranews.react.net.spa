const fetchCrawlingItems = CrawlingItems => {
	return {
		type: 'CRAWLING_ITEM_FETCHED',
		payload: CrawlingItems,
	};
};

const selectCrawlingItem = CrawlingItem => {
	return {
		type: 'CRAWLING_ITEM_SELECTED',
		payload: CrawlingItem,
	};
};

export { selectCrawlingItem, fetchCrawlingItems };
export default {
	fetchCrawlingItems: fetchCrawlingItems,
	selectCrawlingItem: selectCrawlingItem,
};
