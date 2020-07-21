import { ACTION_TYPES } from '../Actions/CrawlingSource';
const initialState = {
	list: [],
};
export const CrawlingSourcesReducer = (State = initialState, Action) => {
	switch (Action.type) {
		case ACTION_TYPES.FETCH_ALL:
			return { ...State, list: [...Action.payload] };
		default:
			break;
	}
	return State;
};

export const SelectedSourceReducer = (source = null, Action) => {
	if (Action.type === 'CRAWLING_SOURCE_SELECTED') {
		return Action.payload;
	}
	return source;
};
// export { CrawlingSourcesReducer, SelectedSourceReducer };
export default {
	CrawlingSourcesReducer: CrawlingSourcesReducer,
	SelectedSourceReducer: SelectedSourceReducer,
};
