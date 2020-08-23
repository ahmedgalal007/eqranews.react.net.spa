export const CRAWL_ITEM_ACTIONS = {
	//REQUEST_CRAWL_STEP_FETCH_ALL: 'REQUEST_CRAWL_STEP_FETCH_ALL',
	REQUEST_CRAWL_ITEM_FETCH_BY_ID: 'REQUEST_CRAWL_ITEM_FETCH_BY_ID',
	REQUEST_CRAWL_ITEM_FETCH_BY_STEP: 'REQUEST_CRAWL_ITEM_FETCH_BY_STEP',
	REQUEST_CRAWL_ITEM_CREATE: 'REQUEST_CRAWL_ITEM_CREATE',
	REQUEST_CRAWL_ITEM_UPDATE: 'REQUEST_CRAWL_ITEM_UPDATE',
	REQUEST_CRAWL_ITEM_DELETE: 'REQUEST_CRAWL_ITEM_DELETE',
	RECEIVE_CRAWL_ITEM_FETCH_BY_ID: 'RECEIVE_CRAWL_ITEM_FETCH_BY_ID',
	RECEIVE_CRAWL_ITEM_FETCH_BY_STEP: 'RECEIVE_CRAWL_ITEM_FETCH_BY_STEP',
	RECEIVE_CRAWL_ITEM_CREATE: 'RECEIVE_CRAWL_ITEM_CREATE',
	RECEIVE_CRAWL_ITEM_UPDATE: 'RECEIVE_CRAWL_ITEM_UPDATE',
	RECEIVE_CRAWL_ITEM_DELETE: '  RECEIVE_CRAWL_ITEM_DELETE',
};

export const requestFetchAllCrawlItems = () => ({
	type: CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_FETCH_ALL,
	data: null,
});

export const requestFetchCrawlItemById = id => ({
	type: CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_FETCH_BY_ID,
	data: id,
});

export const requestFetchCrawlItemByStep = id => ({
	type: CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_FETCH_BY_STEP,
	data: id,
});

export const requestCreateCrawlItem = data => ({
	type: CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_CREATE,
	data: data,
});
export const requestUpdateCrawlItem = (id, data) => ({
	type: CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_UPDATE,
	data: { id: id, data: data },
});
export const requestDeleteCrawlItem = id => ({
	type: CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_DELETE,
	data: id,
});

// RECEIVE DATA
export const receiveFetchAllCrawlItems = data => ({
	type: CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_FETCH_ALL,
	data: data,
});
export const receiveFetchCrawlItemById = data => ({
	type: CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_FETCH_BY_ID,
	data: data,
});
export const receiveFetchCrawlItemByStep = data => ({
	type: CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_FETCH_BY_STEP,
	data: data,
});
export const receiveCreateCrawlItem = data => ({
	type: CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_CREATE,
	data: data,
});
export const receiveUpdateCrawlItem = data => ({
	type: CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_UPDATE,
	data: data,
});
export const receiveDeleteCrawlItem = data => ({
	type: CRAWL_ITEM_ACTIONS.RECEIVE_CRAWL_ITEM_DELETE,
	data: data,
});
