import { CRAWL_SOURCE_ACTIONS } from '../Actions/CrawlSource';

export const CrawlSources = (state = [], { type: type, data: data }) => {
	switch (type) {
		case CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_FETCH_ALL:
			return [...data];

		case CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_CREATE:
			return [...state, data];

		case CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));

		case CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_DELETE:
			return state.filter(x => x.id != data);
		default:
			return [...state];
	}
};
