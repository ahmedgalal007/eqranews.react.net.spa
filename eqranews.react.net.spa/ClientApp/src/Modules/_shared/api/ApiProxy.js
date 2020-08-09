import axios from 'axios';

const Countries = (control, baseUrl = '/api/') => {
	if (control.slice(-1) != '/') control += '/';
	const url = baseUrl + control;
	if (url.slice(-1) != '/') url += '/';
	return {
		fetchAll: async () => {
			const res = await axios.get(url);
			console.log('Api Response', res);
			return res.data;
		},
		fetchById: async id => await axios.get(url + id),
		create: async newRecord =>
			await axios.post(url, newRecord, {
				headers: { 'Content-Type': 'multipart/form-data' },
			}),
		update: async (id, updateRecord) =>
			await axios.put(url + id, updateRecord, {
				headers: { 'Content-Type': 'multipart/form-data' },
			}),
		delete: async id => await axios.delete(url + id),
	};
};

export default Countries;
