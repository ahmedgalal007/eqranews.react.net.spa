import { CRAWL_STEPPER_ACTIONS } from '../Actions/CrawlStepper';

export const CrawlSteppers = (state = [], { type: type, data: data }) => {
	switch (type) {
		// case CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_FETCH_ALL:
		// 	return data;
		case CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_FETCH_BY_SOURCE:
			return data;
		case CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_CREATE:
			return [...state, data.data];
		case CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));
		case CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_DELETE:
			return state.filter(x => x.id != data);
		default:
			return state;
	}
};
