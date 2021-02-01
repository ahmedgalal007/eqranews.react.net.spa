import { CRAWL_ITEM_ACTIONS } from '../Actions/CrawlItem';

export const CrawlItems = (state = [], { type: type, data: data }) => {
	switch (type) {
		// case CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_FETCH_ALL:
		// 	return data;

		case CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_FETCH_BY_STEP:
			return [...data];
		case CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_CREATE:
			return [...state, data];
		case CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));
		case CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_DELETE:
			return state.filter(x => x.id != data);
		default:
			return [...state];
	}
};
