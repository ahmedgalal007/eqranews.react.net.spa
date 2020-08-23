export const CRAWL_STEP_ACTIONS = {
	//REQUEST_CRAWL_STEP_FETCH_ALL: 'REQUEST_CRAWL_STEP_FETCH_ALL',
	REQUEST_CRAWL_STEP_FETCH_BY_ID: 'REQUEST_CRAWL_STEP_FETCH_BY_ID',
	REQUEST_CRAWL_STEP_FETCH_BY_STEPPER: 'REQUEST_CRAWL_STEP_FETCH_BY_STEPPER',
	REQUEST_CRAWL_STEP_CREATE: 'REQUEST_CRAWL_STEP_CREATE',
	REQUEST_CRAWL_STEP_UPDATE: 'REQUEST_CRAWL_STEP_UPDATE',
	REQUEST_CRAWL_STEP_DELETE: 'REQUEST_CRAWL_STEP_DELETE',
	RECEIVE_CRAWL_STEP_FETCH_BY_ID: 'RECEIVE_CRAWL_STEP_FETCH_BY_ID',
	RECEIVE_CRAWL_STEP_FETCH_BY_STEPPER: 'RECEIVE_CRAWL_STEP_FETCH_BY_STEPPER',
	RECEIVE_CRAWL_STEP_CREATE: 'RECEIVE_CRAWL_STEP_CREATE',
	RECEIVE_CRAWL_STEP_UPDATE: 'RECEIVE_CRAWL_STEP_UPDATE',
	RECEIVE_CRAWL_STEP_DELETE: '  RECEIVE_CRAWL_STEP_DELETE',
};

export const requestFetchAllCrawlSteps = () => ({
	type: CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_FETCH_ALL,
	data: null,
});

export const requestFetchCrawlStepById = id => ({
	type: CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_FETCH_BY_ID,
	data: id,
});

export const requestFetchCrawlStepByStepper = id => ({
	type: CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_FETCH_BY_STEPPER,
	data: id,
});

export const requestCreateCrawlStep = data => ({
	type: CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_CREATE,
	data: data,
});
export const requestUpdateCrawlStep = (id, data) => ({
	type: CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_UPDATE,
	data: { id: id, data: data },
});
export const requestDeleteCrawlStep = id => ({
	type: CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_DELETE,
	data: id,
});

// RECEIVE DATA
export const receiveFetchAllCrawlSteps = data => ({
	type: CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_FETCH_ALL,
	data: data,
});
export const receiveFetchCrawlStepById = data => ({
	type: CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_FETCH_BY_ID,
	data: data,
});
export const receiveFetchCrawlStepByStepper = data => ({
	type: CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_FETCH_BY_STEPPER,
	data: data,
});
export const receiveCreateCrawlStep = data => ({
	type: CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_CREATE,
	data: data,
});
export const receiveUpdateCrawlStep = data => ({
	type: CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_UPDATE,
	data: data,
});
export const receiveDeleteCrawlStep = data => ({
	type: CRAWL_STEP_ACTIONS.RECEIVE_CRAWL_STEP_DELETE,
	data: data,
});
