const fetchCrawlingSteps = CrawlingSteps => {
	return {
		type: 'CRAWLING_STEP_FETCHED',
		payload: CrawlingSteps,
	};
};

const selectCrawlingStep = CrawlingStep => {
	return {
		type: 'CRAWLING_STEP_SELECTED',
		payload: CrawlingStep,
	};
};

const addCrawlingStep = CrawlingStep => {
	return {
		type: 'CRAWLING_STEP_ADDED',
		payload: CrawlingStep,
	};
};

const updateCrawlingStep = CrawlingStep => {
	return {
		type: 'CRAWLING_STEP_UPDATED',
		payload: CrawlingStep,
	};
};

const deleteCrawlingStep = CrawlingStep => {
	return {
		type: 'CRAWLING_STEP_DELETED',
		payload: CrawlingStep,
	};
};
export {
	fetchCrawlingSteps,
	selectCrawlingStep,
	addCrawlingStep,
	updateCrawlingStep,
	deleteCrawlingStep,
};
export default {
	fetchCrawlingSteps: fetchCrawlingSteps,
	selectCrawlingStep: selectCrawlingStep,
	addCrawlingStep: addCrawlingStep,
	updateCrawlingStep: updateCrawlingStep,
	deleteCrawlingStep: deleteCrawlingStep,
};
