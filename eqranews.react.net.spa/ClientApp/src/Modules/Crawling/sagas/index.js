import crawlSourceSagas from './CrawlSource';
import ceawlStepperSagas from './CrawlStepper';
import crawlStepSagas from './CrawlStep';
import crawlItemSagas from './CrawlItem';

// export { crawlSourceSagas };

export default [
	...crawlSourceSagas,
	...ceawlStepperSagas,
	...crawlStepSagas,
	...crawlItemSagas,
];
