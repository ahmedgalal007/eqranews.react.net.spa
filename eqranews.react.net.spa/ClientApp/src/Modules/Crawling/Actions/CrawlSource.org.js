import api from '../Api/CrawlSource';

export const ACTION_TYPES = {
	CREATE: 'CREATE',
	UPDATE: 'UPDATE',
	DELETE: 'DELETE',
	FETCH_ALL: 'FETCH_ALL',
};
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

export default {
	CREATE: create,
	UPDATE: update,
	DELETE: Delete,
	FETCH_ALL: fetchAll,
};
