import api from '../Api/CrawlSource';

export const ACTION_TYPES = {
	CRAWL_SOURCE_LOADING: 'CRAWL_SOURCE_LOADING',
	REQUEST_CRAWL_SOURCE_CREATE: 'REQUEST_CRAWL_SOURCE_CREATE',
	REQUEST_CRAWL_SOURCE_UPDATE: 'REQUEST_CRAWL_SOURCE_UPDATE',
	REQUEST_CRAWL_SOURCE_DELETE: 'REQUEST_CRAWL_SOURCE_DELETE',
	REQUEST_CRAWL_SOURCE_FETCH_ALL: 'REQUEST_CRAWL_SOURCE_FETCH_ALL',
	RECEIVE_CRAWL_SOURCE_CREATE: 'RECEIVE_CRAWL_SOURCE_CREATE',
	RECEIVE_CRAWL_SOURCE_UPDATE: 'RECEIVE_CRAWL_SOURCE_UPDATE',
	RECEIVE_CRAWL_SOURCE_DELETE: 'RECEIVE_CRAWL_SOURCE_DELETE',
	RECEIVE_CRAWL_SOURCE_FETCH_ALL: 'RECEIVE_CRAWL_SOURCE_FETCH_ALL',
};

export const requestCrawlSourceFetchAll = () => ({
	type: ACTION_TYPES.REQUEST_CRAWL_SOURCE_FETCH_ALL,
});

export const receiveCrawlSourceFetchAll = /*async*/ data => /*await*/ ({
	type: ACTION_TYPES.RECEIVE_CRAWL_SOURCE_FETCH_ALL,
	data,
});

export const crawlSourceLoadStart = () => ({
	type: ACTION_TYPES.CRAWL_SOURCE_LOADING,
	data: true,
});
export const crawlSourceLoadEnd = () => ({
	type: ACTION_TYPES.CRAWL_SOURCE_LOADING,
	data: false,
});

const formateData = data => ({
	...data,
	//age: parseInt(data.age ? data.age : 0),
});

export const fetchAll = CrawlingSource => {
	api
		.CrawlSources()
		.fetchAll()
		.then(res => {
			return {
				type: ACTION_TYPES.FETCH_ALL,
				payload: res.data,
			};
		})
		.catch(err => console.log('api Component CrawlingSource Error:', err));
};

export const create = (data, onSuccess) => dispatch => {
	data = formateData(data);
	api
		.CrawlSources()
		.create(data)
		.then(res => {
			dispatch({
				type: ACTION_TYPES.create,
				payload: res.data,
			});
			onSuccess();
		})
		.catch(err =>
			console.log('api Component CrawlingSource Create Error:', err)
		);
};

export const update = (id, data, onSuccess) => dispatch => {
	data = formateData(data);
	api
		.CrawlSources()
		.update(id, data)
		.then(res => {
			dispatch({
				type: ACTION_TYPES.update,
				payload: { id, ...res.data },
			});
			onSuccess();
		})
		.catch(err =>
			console.log('api Component CrawlingSource Create Error:', err)
		);
};

export const Delete = (id, onSuccess) => dispatch => {
	api
		.CrawlSources()
		.delete(id)
		.then(res => {
			dispatch({
				type: ACTION_TYPES.delete,
				payload: id,
			});
			onSuccess();
		})
		.catch(err =>
			console.log('api Component CrawlingSource Create Error:', err)
		);
};

// export default {
// 	CREATE: create,
// 	UPDATE: update,
// 	DELETE: Delete,
// 	FETCH_ALL: fetchAll,
// };
