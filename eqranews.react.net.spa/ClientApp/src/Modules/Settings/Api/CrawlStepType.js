import axios from 'axios';

const CrawlStepTypes = () => {
	const baseUrl = '/api/';
	const url = baseUrl + 'CrawlSetpTypes/';
	return {
		fetchAll: async () => {
			const res = await axios.get(url);
			console.log('Axios Data:', res.data);
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

export default CrawlStepTypes();
