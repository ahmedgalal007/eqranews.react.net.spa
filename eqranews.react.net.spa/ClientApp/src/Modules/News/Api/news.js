import axios from 'axios';

const ApiFactory = () => {
	const baseUrl = '/api/';
	const url = baseUrl + 'News/';
	return {
		fetchAll: async (pageNumber, usersInPage) => {
			let res;
			if (pageNumber && usersInPage) {
				res = await axios.get(
					url +
						'GetNews?pageNumber=' +
						pageNumber +
						'&usersInPage=' +
						usersInPage
				);
			} else {
				res = await axios.get(url + 'GetNews/');
			}
			console.log(res);
			const data = await res.data;
			return data;
		},
		fetchByRole: roleName => axios.get(url + 'getUsersInRole/' + roleName),
		// create: newRecord => axios.post(url, newRecord),
		update: (id, updateRecord) => axios.put(url + id, updateRecord),
		delete: id => axios.delete(url + id),
	};
};

export default ApiFactory;
