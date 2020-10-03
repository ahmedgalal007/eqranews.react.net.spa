export const ACTIONS = {
	REQUEST_NEWS_FETCH_ALL: 'REQUEST_NEWS_FETCH_ALL',
	REQUEST_NEWS_FETCH_BY_ID: 'REQUEST_NEWS_FETCH_BY_ID',
	REQUEST_NEWS_FETCH_BY_CATEGORY: 'REQUEST_NEWS_FETCH_BY_CATEGORY',
	REQUEST_NEWS_CREATE: 'REQUEST_NEWS_CREATE',
	REQUEST_NEWS_UPDATE: 'REQUEST_NEWS_UPDATE',
	REQUEST_NEWS_DELETE: 'REQUEST_NEWS_DELETE',
	RECEIVE_NEWS_FETCH_ALL: 'RECEIVE_NEWS_FETCH_ALL',
	RECEIVE_NEWS_FETCH_BY_ID: 'RECEIVE_NEWS_FETCH_BY_ID',
	RECEIVE_NEWS_FETCH_BY_CATEGORY: 'RECEIVE_NEWS_FETCH_BY_CATEGORY',
	RECEIVE_NEWS_CREATE: 'RECEIVE_NEWS_CREATE',
	RECEIVE_NEWS_UPDATE: 'RECEIVE_NEWS_UPDATE',
	RECEIVE_NEWS_DELETE: 'RECEIVE_NEWS_DELETE',
};

export const requestFetchAllNews = () => ({
	type: ACTIONS.REQUEST_NEWS_FETCH_ALL,
	data: null,
});

export const requestFetchNewsById = id => ({
	type: ACTIONS.REQUEST_NEWS_FETCH_BY_ID,
	data: id,
});

export const requestFetchNewsByCategory = id => ({
	type: ACTIONS.REQUEST_NEWS_FETCH_BY_STEP,
	data: id,
});

export const requestCreateNews = data => ({
	type: ACTIONS.REQUEST_NEWS_CREATE,
	data: data,
});
export const requestUpdateNews = (id, data) => ({
	type: ACTIONS.REQUEST_NEWS_UPDATE,
	data: { id: id, data: data },
});
export const requestDeleteNews = id => ({
	type: ACTIONS.REQUEST_NEWS_DELETE,
	data: id,
});

// RECEIVE DATA
export const receiveFetchAllNews = data => ({
	type: ACTIONS.RECEIVE_NEWS_FETCH_ALL,
	data: data,
});
export const receiveFetchNewsById = data => ({
	type: ACTIONS.RECEIVE_NEWS_FETCH_BY_ID,
	data: data,
});
export const receiveFetchNewsByCategory = data => ({
	type: ACTIONS.RECEIVE_NEWS_FETCH_BY_STEP,
	data: data,
});
export const receiveCreateNews = data => ({
	type: ACTIONS.RECEIVE_NEWS_CREATE,
	data: data,
});
export const receiveUpdateNews = data => ({
	type: ACTIONS.RECEIVE_NEWS_UPDATE,
	data: data,
});
export const receiveDeleteNews = data => ({
	type: ACTIONS.RECEIVE_NEWS_DELETE,
	data: data,
});
