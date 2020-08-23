export const CRAWL_STEPPER_ACTIONS = {
	//REQUEST_CRAWL_STEPPER_FETCH_ALL: 'REQUEST_CRAWL_STEPPER_FETCH_ALL',
	REQUEST_CRAWL_STEPPER_FETCH_BY_ID: 'REQUEST_CRAWL_STEPPER_FETCH_BY_ID',
	REQUEST_CRAWL_STEPPER_FETCH_BY_SOURCE:
		'REQUEST_CRAWL_STEPPER_FETCH_BY_SOURCE',
	REQUEST_CRAWL_STEPPER_CREATE: 'REQUEST_CRAWL_STEPPER_CREATE',
	REQUEST_CRAWL_STEPPER_UPDATE: 'REQUEST_CRAWL_STEPPER_UPDATE',
	REQUEST_CRAWL_STEPPER_DELETE: 'REQUEST_CRAWL_STEPPER_DELETE',
	RECEIVE_CRAWL_STEPPER_FETCH_BY_ID: 'RECEIVE_CRAWL_STEPPER_FETCH_BY_ID',
	RECEIVE_CRAWL_STEPPER_FETCH_BY_SOURCE:
		'RECEIVE_CRAWL_STEPPER_FETCH_BY_SOURCE',
	RECEIVE_CRAWL_STEPPER_CREATE: 'RECEIVE_CRAWL_STEPPER_CREATE',
	RECEIVE_CRAWL_STEPPER_UPDATE: 'RECEIVE_CRAWL_STEPPER_UPDATE',
	RECEIVE_CRAWL_STEPPER_DELETE: '  RECEIVE_CRAWL_STEPPER_DELETE',
};

export const requestFetchAllCrawlSteppers = () => ({
	type: CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_FETCH_ALL,
	data: null,
});

export const requestFetchCrawlStepperById = id => ({
	type: CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_FETCH_BY_ID,
	data: id,
});

export const requestFetchCrawlStepperBySource = id => ({
	type: CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_FETCH_BY_SOURCE,
	data: id,
});

export const requestCreateCrawlStepper = data => ({
	type: CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_CREATE,
	data: data,
});
export const requestUpdateCrawlStepper = (id, data) => ({
	type: CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_UPDATE,
	data: { id: id, data: data },
});
export const requestDeleteCrawlStepper = id => ({
	type: CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_DELETE,
	data: id,
});

// RECEIVE DATA
export const receiveFetchAllCrawlSteppers = data => ({
	type: CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_FETCH_ALL,
	data: data,
});
export const receiveFetchCrawlStepperById = data => ({
	type: CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_FETCH_BY_ID,
	data: data,
});
export const receiveFetchCrawlStepperBySource = data => ({
	type: CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_FETCH_BY_SOURCE,
	data: data,
});
export const receiveCreateCrawlStepper = data => ({
	type: CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_CREATE,
	data: data,
});
export const receiveUpdateCrawlStepper = data => ({
	type: CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_UPDATE,
	data: data,
});
export const receiveDeleteCrawlStepper = data => ({
	type: CRAWL_STEPPER_ACTIONS.RECEIVE_CRAWL_STEPPER_DELETE,
	data: data,
});