import { combineReducers } from 'redux';
import CrawlReducers from './Modules/Crawling/Reducers';
import AuthenticationReducers from './Modules/Authentication/Reducers';

export default combineReducers({
	...CrawlReducers,
	...AuthenticationReducers,
});
