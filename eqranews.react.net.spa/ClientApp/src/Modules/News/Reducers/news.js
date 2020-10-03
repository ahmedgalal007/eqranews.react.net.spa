import { ACTIONS } from '../Actions/news';

export const NewsItems = (state = [], { type: type, data: data }) => {
	switch (type) {
		case ACTIONS.RECEIVE_NEWS_FETCH_ALL:
			return data;
		case ACTIONS.RECEIVE_NEWS_FETCH_BY_CATEGORY:
			return data;
		case ACTIONS.RECEIVE_NEWS_CREATE:
			return [...state, data];
		case ACTIONS.RECEIVE_NEWS_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));
		case ACTIONS.RECEIVE_NEWS_DELETE:
			return state.filter(x => x.id != data);
		default:
			return state;
	}
};
