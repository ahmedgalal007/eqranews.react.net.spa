import axios from 'axios';

const ApiFactory = () => {
	const baseUrl = '/api/';
	const url = baseUrl + 'NewsItem/';
	return {
		fetchById: async id => {
			const res = await axios.get(url + `GetNewsItem/${id}`);
			const data = await res.data;
			return data;
		},
		create: newRecord => axios.post(url, newRecord),
		update: (id, updateRecord) => axios.put(url + id, updateRecord),
		delete: id => axios.delete(url + id),
	};
};

export default ApiFactory;
