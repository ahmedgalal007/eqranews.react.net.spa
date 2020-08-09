import * as CountryReducers from './Country';
import * as CategoryReducers from './Category';
import * as CrawlStepTypeReducers from './CrawlStepType';

export default {
	...CountryReducers,
	...CategoryReducers,
	...CrawlStepTypeReducers,
};
