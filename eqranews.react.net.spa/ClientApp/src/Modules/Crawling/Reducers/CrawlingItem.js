const CrawlingItemsReducer = (CrawlingItems = [], Action) => {
	if (Action.type === 'CRAWLING_ITEM_FETCHED') {
		return [...CrawlingItems, Action.payload];
	}
	return CrawlingItems;
};
const SelectedItemReducer = (item = null, Action) => {
	if (Action.type === 'CRAWLING_ITEM_SELECTED') {
		return Action.payload;
	}
	return item;
};
export { CrawlingItemsReducer, SelectedItemReducer };
export default {
	CrawlingItemsReducer: CrawlingItemsReducer,
	SelectedItemReducer: SelectedItemReducer,
};
