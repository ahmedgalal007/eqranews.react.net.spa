import { all } from 'redux-saga/effects';
import CrawlingSagas from './Modules/Crawling/sagas';

export default function* rootSaga() {
	console.log('sagas:', [...CrawlingSagas]);
	yield all([...CrawlingSagas]);
	// code after all-effect
}
