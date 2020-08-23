import { CRAWL_STEP_ACTIONS } from '../Actions/CrawlStep';

export const CrawlSteps = (state = [], { type: type, data: data }) => {
	switch (type) {
		// case CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_FETCH_ALL:
		// 	return data;
		case CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_FETCH_BY_STEPPER:
			return data;
		case CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_CREATE:
			return [...state, data.data];
		case CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));
		case CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_DELETE:
			return state.filter(x => x.id != data);
		default:
			return state;
	}
};
