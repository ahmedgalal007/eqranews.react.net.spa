import { combineReducers } from 'redux';
import AuthenticationReducers from './Modules/Authentication/Reducers';
import CrawlReducers from './Modules/Crawling/Reducers';
import SettingsReducers from './Modules/Settings/Reducers';

const IsPageLoading = (state = false, { type: type, data: data }) => {
	switch (type) {
		case 'PAGE_LOADING':
			return data;
			break;
		default:
			return false;
	}
};

const RouterCurrentPage = (state = {}, { type: type, data: data }) => {
	switch (type) {
		case 'ROUTER_PAGE_CHANGED':
			console.log('ROUTE PAGE CHANGED TRIGGERD!!!!', data);
			return { ...data };
			break;
		default:
			return { title: 'Home', path: '/' };
	}
};
const NavigationState = (state = {}, { type: type, data: data }) => {
	switch (type) {
		case 'UPDATE_NAVIGATION_STATE':
			return { ...data };
			break;
		default:
			return {};
	}
};

export default combineReducers({
	IsPageLoading,
	RouterCurrentPage,
	NavigationState,
	...CrawlReducers,
	...SettingsReducers,
	...AuthenticationReducers,
});
