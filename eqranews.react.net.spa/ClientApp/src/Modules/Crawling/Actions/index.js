import { fetchCrawlingSources } from './Crawling';
import { selectCrawlingSource } from './CrawlingSource';
import { selectCrawlingStep } from './CrawlingStep';
import { selectCrawlingItem } from './CrawlingItem';

export {
	fetchCrawlingSources,
	selectCrawlingSource,
	selectCrawlingStep,
	selectCrawlingItem,
};
export default {
	fetchCrawlingSources: fetchCrawlingSources,
	selectCrawlingSource: selectCrawlingSource,
	selectCrawlingStep: selectCrawlingStep,
	selectCrawlingItem: selectCrawlingItem,
};
