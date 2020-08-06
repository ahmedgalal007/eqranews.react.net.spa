import { combineReducers } from 'redux';
import AuthenticationReducers from './Modules/Authentication/Reducers';
import CrawlReducers from './Modules/Crawling/Reducers';
import SettingsReducers from './Modules/Settings/Reducers';

const IsPageLoading = (state = false, { type: type, data: data }) => {
	switch (type) {
		case 'PAGE_LOADING':
			return data;
		default:
			return false;
	}
};

export default combineReducers({
	IsPageLoading,
	...CrawlReducers,
	...SettingsReducers,
	...AuthenticationReducers,
});
