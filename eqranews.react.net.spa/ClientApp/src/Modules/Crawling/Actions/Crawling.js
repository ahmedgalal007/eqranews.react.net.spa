const CRAWLING_SOURCES_API_REQUEST = 'CRAWLING_SOURCES_API_REQUEST';
const CRAWLING_SOURCE_FETCHED = 'CRAWLING_SOURCE_FETCHED';

const requestCrawlingSources = CrawlingSources => {
	return {
		type: CRAWLING_SOURCES_API_REQUEST,
		payload: CrawlingSources,
	};
};

const fetchCrawlingSources = CrawlingSources => {
	return {
		type: CRAWLING_SOURCE_FETCHED,
		payload: CrawlingSources,
	};
};

const types = { CRAWLING_SOURCES_API_REQUEST, CRAWLING_SOURCE_FETCHED };
export { types, requestCrawlingSources, fetchCrawlingSources };

export default {
	requestCrawlingSources: requestCrawlingSources,
	fetchCrawlingSources: fetchCrawlingSources,
};
