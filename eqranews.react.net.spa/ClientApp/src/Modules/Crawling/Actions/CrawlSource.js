export const CRAWL_SOURCE_ACTIONS = {
	REQUEST_CRAWL_SOURCE_FETCH_ALL: 'REQUEST_CRAWL_SOURCE_FETCH_ALL',
	REQUEST_CRAWL_SOURCE_FETCH_BY_ID: 'REQUEST_CRAWL_SOURCE_FETCH_BY_ID',
	REQUEST_CRAWL_SOURCE_CREATE: 'REQUEST_CRAWL_SOURCE_CREATE',
	REQUEST_CRAWL_SOURCE_UPDATE: 'REQUEST_CRAWL_SOURCE_UPDATE',
	REQUEST_CRAWL_SOURCE_DELETE: 'REQUEST_CRAWL_SOURCE_DELETE',
	RECEIVE_CRAWL_SOURCE_FETCH_ALL: 'RECEIVE_CRAWL_SOURCE_FETCH_ALL',
	RECEIVE_CRAWL_SOURCE_FETCH_BY_ID: 'RECEIVE_CRAWL_SOURCE_FETCH_BY_ID',
	RECEIVE_CRAWL_SOURCE_CREATE: 'RECEIVE_CRAWL_SOURCE_CREATE',
	RECEIVE_CRAWL_SOURCE_UPDATE: 'RECEIVE_CRAWL_SOURCE_UPDATE',
	RECEIVE_CRAWL_SOURCE_DELETE: 'RECEIVE_CRAWL_SOURCE_DELETE',
};

// export const requestFetchAllCrawlSources = () => ({
// 	type: CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_FETCH_ALL,
// 	data: null,
// });
export const requestFetchAllCrawlSources = data => ({
	type: CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_FETCH_ALL,
	data: data,
});

export const requestFetchCrawlSourceById = id => ({
	type: CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_FETCH_BY_ID,
	data: id,
});
export const requestCreateCrawlSource = data => ({
	type: CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_CREATE,
	data: data,
});
export const requestUpdateCrawlSource = (id, data) => ({
	type: CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_UPDATE,
	data: { id: id, data: data },
});
export const requestDeleteCrawlSource = id => ({
	type: CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_DELETE,
	data: id,
});

// RECEIVE DATA
export const receiveFetchAllCrawlSources = data => ({
	type: CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_FETCH_ALL,
	data: data,
});
export const receiveFetchCrawlSourceById = data => ({
	type: CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_FETCH_BY_ID,
	data: data,
});
export const receiveCreateCrawlSource = data => ({
	type: CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_CREATE,
	data: data,
});
export const receiveUpdateCrawlSource = data => ({
	type: CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_UPDATE,
	data: data,
});
export const receiveDeleteCrawlSource = data => ({
	type: CRAWL_SOURCE_ACTIONS.RECEIVE_CRAWL_SOURCE_DELETE,
	data: data,
});
