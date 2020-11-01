export const ACTIONS = {
	REQUEST_NEWS_ITEM_FETCH_BY_ID: 'REQUEST_NEWS_ITEM_FETCH_BY_ID',
	REQUEST_NEWS_ITEM_CREATE: 'REQUEST_NEWS_ITEM_CREATE',
	REQUEST_NEWS_ITEM_UPDATE: 'REQUEST_NEWS_ITEM_UPDATE',
	REQUEST_NEWS_ITEM_DELETE: 'REQUEST_NEWS_ITEM_DELETE',
	RECEIVE_NEWS_ITEM_FETCH_BY_ID: 'RECEIVE_NEWS_ITEM_FETCH_BY_ID',
	RECEIVE_NEWS_ITEM_CREATE: 'RECEIVE_NEWS_ITEM_CREATE',
	RECEIVE_NEWS_ITEM_UPDATE: 'RECEIVE_NEWS_ITEM_UPDATE',
	RECEIVE_NEWS_ITEM_DELETE: 'RECEIVE_NEWS_ITEM_DELETE',
};

export const requestFetchNewsItemById = id => ({
	type: ACTIONS.REQUEST_NEWS_ITEM_FETCH_BY_ID,
	data: id,
});

export const requestCreateNewsItem = data => ({
	type: ACTIONS.REQUEST_NEWS_ITEM_CREATE,
	data: data,
});
export const requestUpdateNewsItem = (id, data) => ({
	type: ACTIONS.REQUEST_NEWS_ITEM_UPDATE,
	data: { id: id, data: data },
});
export const requestDeleteNewsItem = id => ({
	type: ACTIONS.REQUEST_NEWS_ITEM_DELETE,
	data: id,
});

// RECEIVE DATA
export const receiveFetchNewsItemById = data => ({
	type: ACTIONS.RECEIVE_NEWS_ITEM_FETCH_BY_ID,
	data: data,
});
export const receiveCreateNewsItem = data => ({
	type: ACTIONS.RECEIVE_NEWS_ITEM_CREATE,
	data: data,
});
export const receiveUpdateNewsItem = data => ({
	type: ACTIONS.RECEIVE_NEWS_ITEM_UPDATE,
	data: data,
});
export const receiveDeleteNewsItem = data => ({
	type: ACTIONS.RECEIVE_NEWS_ITEM_DELETE,
	data: data,
});
