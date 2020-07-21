import api from '../api/CrawlingSource';

export const ACTION_TYPES = {
	CREATE: 'CREATE',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	FETCH_ALL: 'FETCH_ALL',
};

const selectCrawlingSource = CrawlingSource => {
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
export { selectCrawlingSource };
export default {
	selectCrawlingSource: selectCrawlingSource,
};
