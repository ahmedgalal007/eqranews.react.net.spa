import { SETTINGS_CATEGORY_ACTIONS } from '../Actions/Category';
//import Countries from '../../_shared/components/Countries';

export const Categories = (state = [], { type: type, data: data }) => {
	switch (type) {
		case SETTINGS_CATEGORY_ACTIONS.RECEIVE_SETTINGS_CATEGORY_FETCH_ALL:
			return data;
		case SETTINGS_CATEGORY_ACTIONS.RECEIVE_SETTINGS_CATEGORY_FETCH_BY_ID:
			return [...state.filter(x => x.id == data)];
		case SETTINGS_CATEGORY_ACTIONS.RECEIVE_SETTINGS_CATEGORY_CREATE:
			return [...state, data.data];
		case SETTINGS_CATEGORY_ACTIONS.RECEIVE_SETTINGS_CATEGORY_UPDATE:
			return state.map(x =>
				x.id == data.id ? { ...data, crawlSources: null } : x
			);
		case SETTINGS_CATEGORY_ACTIONS.RECEIVE_SETTINGS_CATEGORY_DELETE:
			console.log('Deleted', data);
			return [...state.filter(x => x.id != data.id)];
		default:
			return state;
	}
};

export default Categories;
