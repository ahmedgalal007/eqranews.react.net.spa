import axios from 'axios';

const Countries = () => {
	const baseUrl = '/api/';
	const url = baseUrl + 'Categories/';
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

export default Countries();
