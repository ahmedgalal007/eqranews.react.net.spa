const fetchCrawlingData = async () => {
	try {
		const response = await fetch('Data/CrawlingSources.json');
		const data = await response.json();
		return data;
	} catch (e) {
		console.log('ERR fetchData:', e);
	}
};

export { fetchCrawlingData };

export default { fetchCrawlingData: fetchCrawlingData };
