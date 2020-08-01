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
			fetchById: id => axios.get(url + id),
			create: newRecord => axios.post(url, newRecord),
			update: (id, updateRecord) => axios.put(url + id, updateRecord),
			delete: id => axios.delete(url + id),
		};
	},
};
