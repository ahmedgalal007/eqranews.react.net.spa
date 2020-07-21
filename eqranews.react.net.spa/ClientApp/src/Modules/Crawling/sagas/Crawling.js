import {
	call,
	put,
	/*takeEvery,*/
	takeLatest,
	delay,
} from 'redux-saga/effects';
import { fetchCrawlingData } from '../api/Crawling';

function* fetchResources() {
	try {
		const data = yield call(fetchCrawlingData);
		yield delay(4000);
		yield put({ type: 'CRAWLING_SOURCE_FETCHED', payload: data });
	} catch (e) {
		console.log('ERR fetchResources', e);
	}
}

function* fetchResourcesSaga() {
	yield takeLatest('CRAWLING_SOURCES_API_REQUEST', fetchResources);
}
export { fetchResourcesSaga };
export default [fetchResourcesSaga()];
