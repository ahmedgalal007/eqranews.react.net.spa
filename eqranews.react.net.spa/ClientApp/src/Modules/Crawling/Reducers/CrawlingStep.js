const CrawlingStepsReducer = (CrawlingSteps = [], Action) => {
	if (Action.type === 'CRAWLING_STEP_FETCHED') {
		return Action.payload;
	}
	return CrawlingSteps;
};
const SelectedStepReducer = (step = null, Action) => {
	if (Action.type === 'CRAWLING_STEP_SELECTED') {
		return Action.payload;
	}
	return step;
};
export { CrawlingStepsReducer, SelectedStepReducer };
export default {
	CrawlingStepsReducer: CrawlingStepsReducer,
	SelectedStepReducer: SelectedStepReducer,
};
