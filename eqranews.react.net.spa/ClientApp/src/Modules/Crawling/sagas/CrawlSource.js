import {
	take,
	call,
	put,
	takeLatest,
	delay,
	takeEvery,
	takeLeading,
} from 'redux-saga/effects';
import {
	ACTION_TYPES,
	receiveCrawlSourceFetchAll,
	crawlSourceLoadEnd,
	crawlSourceLoadStart,
} from '../Actions/CrawlSource';

import * as api from '../Api/CrawlSource';
// const api = CrawlSourceApi();

function* crawlSourceFetchAll(action) {
	console.log('Responding to the Saga!!!');
	try {
		//const data = yield call(api.fetchAll);
		const data = yield call(() => [
			{
				Id: 5,
				DomainUrl: 'http://Akhbar.com',
				Name: 'AKHBAR',
				CountryId: 1,
			},
		]);
		yield put(crawlSourceLoadStart());
		yield put(receiveCrawlSourceFetchAll(data));
		yield put(crawlSourceLoadEnd());
	} catch (err) {
		//console.log(err);
	}
}

export function* crawlSourceFetchAllSaga() {
	console.log('Received the Saga Request!!!!!');
	// yield take(ACTION_TYPES.REQUEST_CRAWL_SOURCE_FETCH_ALL);
	// yield call(crawlSourceFetchAll);
	yield takeEvery(
		ACTION_TYPES.REQUEST_CRAWL_SOURCE_FETCH_ALL,
		crawlSourceFetchAll
	);
}

// export default { crawlSourceFetchAllSaga };
