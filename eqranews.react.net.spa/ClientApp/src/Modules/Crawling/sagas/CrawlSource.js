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
		const data = yield call(() => {
			const res = [];
			for (let i = 0; i < 87; i++) {
				res.push({
					Id: i + 1,
					DomainUrl: 'http://Akhbar.com',
					Name: 'AKHBAR',
					CountryId: 1,
				});
			}
			return res;
		});
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		yield delay(4000);

		//yield put(crawlSourceLoadStart());
		yield put(receiveCrawlSourceFetchAll(data));
		//yield put(crawlSourceLoadEnd());

		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		//console.log(err);
	}
}

function* crawlSourceFetchAllSaga() {
	console.log('Received the Saga Request!!!!!');
	yield take(ACTION_TYPES.REQUEST_CRAWL_SOURCE_FETCH_ALL);
	yield call(crawlSourceFetchAll);
	// yield takeEvery(
	// 	ACTION_TYPES.REQUEST_CRAWL_SOURCE_FETCH_ALL,
	// 	crawlSourceFetchAll
	// );
}

export default [crawlSourceFetchAllSaga()];
