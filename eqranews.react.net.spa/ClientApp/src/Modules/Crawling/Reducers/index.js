import * as CrawlSourcesReducers from './CrawlSource';
import * as CrawlSteppersReducers from './CrawlStepper';
import * as CrawlStepsReducers from './CrawlStep';
import * as CrawlItemsReducers from './CrawlItem';
export default {
	...CrawlSourcesReducers,
	...CrawlSteppersReducers,
	...CrawlStepsReducers,
	...CrawlItemsReducers,
};
