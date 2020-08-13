// import {
// 	CrawlingSourcesReducer,
// 	SelectedSourceReducer,
// } from './CrawlingSource';
// import { CrawlingStepsReducer, SelectedStepReducer } from './CrawlingStep';
// import { CrawlingItemsReducer, SelectedItemReducer } from './CrawlingItem';

// // export { CrawlingSourceReducer, CrawlingStepReducer, CrawlingItemsReducer };
// export default {
// 	CrawlingSources: CrawlingSourcesReducer,
// 	SelectedSource: SelectedSourceReducer,
// 	CrawlingSteps: CrawlingStepsReducer,
// 	SelectedStep: SelectedStepReducer,
// 	CrawlingItems: CrawlingItemsReducer,
// 	SelectedItem: SelectedItemReducer,
// };

import * as CrawlSourcesReducers from './CrawlSource';
import * as CrawlSteppersReducers from './CrawlStepper';
export default { ...CrawlSourcesReducers, ...CrawlSteppersReducers };
