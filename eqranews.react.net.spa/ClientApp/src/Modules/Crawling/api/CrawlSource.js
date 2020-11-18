import axios from 'axios';

const baseUrl = '/api/';

export default {
	CrawlSources(url = baseUrl + 'CrawlSources/') {
		return {
			fetchAll: async () => {
				const res = await axios.get(url);
				const data = await res.json();
				return data;
			},
			fetchById: async id => await axios.get(url + id),
			create: async newRecord => await axios.post(url, newRecord),
			update: async (id, updateRecord) =>
				await axios.put(url + id, updateRecord),
			delete: async id => await axios.delete(url + id),
		};
	},
};
