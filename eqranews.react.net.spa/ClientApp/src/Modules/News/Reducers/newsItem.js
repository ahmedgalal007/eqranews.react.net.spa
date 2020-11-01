import { ACTIONS } from '../Actions/newsItem';

export const NewsItem = (state = {}, { type: type, data: data }) => {
	switch (type) {
		case ACTIONS.RECEIVE_NEWS_ITEM_FETCH_BY_ID:
			return data;
		case ACTIONS.RECEIVE_NEWS_ITEM_CREATE:
			return [...state, data];
		case ACTIONS.RECEIVE_NEWS_ITEM_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));
		case ACTIONS.RECEIVE_NEWS_ITEM_DELETE:
			return state.filter(x => x.id != data);
		default:
			return state;
	}
};
