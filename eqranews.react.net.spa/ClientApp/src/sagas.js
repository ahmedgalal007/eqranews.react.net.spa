import { fork, all, call } from 'redux-saga/effects';
// import CrawlingSagas from './Modules/Crawling/sagas';
import { crawlSourceFetchAllSaga } from './Modules/Crawling/sagas/CrawlSource';

export default function* rootSaga() {
	// console.log('sagas:', [...CrawlingSagas]);
	// yield all([crawlSourceFetchAllSaga]);
	// yield all([crawlSourceFetchAllSaga]);
	yield fork(crawlSourceFetchAllSaga);
	// code after all-effect
	// { ...CrawlingSagas }
}
