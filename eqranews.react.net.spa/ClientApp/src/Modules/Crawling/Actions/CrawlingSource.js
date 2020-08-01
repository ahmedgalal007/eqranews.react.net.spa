// import api from '../api/CrawlingSource';

export const ACTION_TYPES = {
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
export const receiveCrawlSourceFetchAll = data => ({
	type: ACTION_TYPES.RECEIVE_CRAWL_SOURCE_FETCH_ALL,
	data,
});

// const selectCrawlingSource = CrawlingSource => {
// 	api
// 		.CrawlSources()
// 		.fetchAll()
// 		.then(res => {
// 			return {
// 				type: ACTION_TYPES.REQUEST_CRAWL_SOURCE_FETCH_ALL,
// 				payload: res.data,
// 			};
// 		})
// 		.catch(err => console.log('api Component CrawlingSource Error:', err));
// };
// export { selectCrawlingSource };
// export default {
//  	selectCrawlingSource: selectCrawlingSource,
// };
