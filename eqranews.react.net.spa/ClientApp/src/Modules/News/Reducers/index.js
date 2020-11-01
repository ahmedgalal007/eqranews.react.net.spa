import * as NewsReducers from './news';
import * as NewsItemReducers from './newsItem';

export default {
	...NewsReducers,
	...NewsItemReducers,
};
