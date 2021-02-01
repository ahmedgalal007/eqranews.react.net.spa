import axios from 'axios';

const Countries = (control, baseUrl = '/api/') => {
	if (control.slice(-1) != '/') control += '/';
	const url = baseUrl + control;
	if (url.slice(-1) != '/') url += '/';
	return {
		url: url,
		fetchAll: () =>
			axios.request({
				method: "get",
				url: url
			})
		,
		fetchById: id => axios.request({
			method: "get",
			url: url + id
		}),
		create: async newRecord => {
			const res = await axios.post(url, newRecord, {
				headers: {
					Accept:
						'application/json, application/xml, text/plain, text/html, *.*',
					'Content-Type':
						'multipart/form-data, application/x-www-form-urlencoded; charset=utf-8',
				},
			});
			return res.data;
		},
		update: async (id, updateRecord) =>
			await axios.put(url + id, updateRecord, {
				headers: {
					Accept:
						'application/json, application/xml, text/plain, text/html, *.*',
					'Content-Type':
						'multipart/form-data, application/x-www-form-urlencoded; charset=utf-8',
				},
			}),
		delete: async id => await axios.delete(url + id),
		applyFilter: async (name, id) => {
			const res = await axios.get(url + name + '/' + id);
			return res.data;
		},
		AddApiFilter: function (filterName) {
			const key = ['filterBy' + filterName];
			console.log('Calling FILTER:', this.url + filterName + '/');
			return {
				...this,
				[key]: async id => {
					const res = await axios
						.get(this.url + filterName + '/' + id)
						.then(response => response.data)
						.catch(error => {
							if (error.response.status === 404) {
								return [];
							}
						});
					return res;
				},
			};
		},
	};
};

export const AddApiFilter = (Api, filterName) => {
	const DFilter = async id => {
		const res = await axios.get(Api.url + filterName + '/' + id);
		return res.data;
	};
	return { ...Api, ['filterBy' + filterName]: DFilter };
};

export default Countries;
