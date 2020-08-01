import { ACTION_TYPES } from '../Actions/CrawlSource';

export const CrawlSources = (state = [], { type, data }) => {
	switch (type) {
		case ACTION_TYPES.RECEIVE_CRAWL_SOURCE_FETCH_ALL:
			console.log('Saga sent the request to reducer!');
			console.log('RECEIVE_CRAWL_SOURCE_FETCH_ALL', data);
			return [...state, ...data];

		case ACTION_TYPES.RECEIVE_CRAWL_SOURCE_CREATE:
			return [...state, data];

		case ACTION_TYPES.RECEIVE_CRAWL_SOURCE_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));

		case ACTION_TYPES.RECEIVE_CRAWL_SOURCE_DELETE:
			return [...state.filter(x => x.id != data)];
		default:
			return state;
	}
};

export const Loading = (state = false, { type, data }) => {
	switch (type) {
		case ACTION_TYPES.CRAWL_SOURCE_LOADING:
			return data;

		default:
			return state;
	}
};
