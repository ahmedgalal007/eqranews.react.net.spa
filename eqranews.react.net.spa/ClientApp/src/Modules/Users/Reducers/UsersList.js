import { USERS_ACTIONS } from '../Actions/UsersList';

export const Users = (state = [], { type: type, data: data }) => {
	switch (type) {
		// case CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_FETCH_ALL:
		// 	return data;

		case USERS_ACTIONS.RECEIVE_USERS_FETCH_ALL:
			return data;
		case USERS_ACTIONS.RECEIVE_USERS_FETCH_BY_ROLE:
			return data;
		case USERS_ACTIONS.RECEIVE_USERS_UPDATE:
			return state.map(x => (x.id == data.id ? data : x));
		case USERS_ACTIONS.RECEIVE_USERS_DELETE:
			return state.filter(x => x.id != data);
		default:
			return state;
	}
};
