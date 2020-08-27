import {
	CRAWL_SOURCE_ACTIONS,
	receiveFetchAllCrawlSources,
	receiveFetchCrawlSourceById,
	receiveCreateCrawlSource,
	receiveUpdateCrawlSource,
	receiveDeleteCrawlSource,
} from '../Actions/CrawlSource';
import { take, takeLatest, put, call, delay } from 'redux-saga/effects';
//import Api from '../Api/CrawlSource';
import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';

const Api = ApiProxy('crawlsources');
// const ApiStepper = AddApiFilter(ApiProxy('crawlsteppers'), 'Source');

console.log('API_WITH_FILTER:', Api);

function* fetchAllCrawlSources() {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.fetchAll);
		yield delay(2000);
		console.log('CrawlSources Data From Saga', data);
		yield put(receiveFetchAllCrawlSources(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* createCrawlSource(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		console.log('CRAWL NEW_RECORD DATA', data);
		yield delay(2000);
		yield put(receiveCreateCrawlSource(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateCrawlSource(action) {
	console.log('Saga Update Action', action);
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		yield call(Api.update, action.data.id, action.data.data);
		const data = Array.from(action.data.data).reduce(
			(o, [k, v]) => ((o[k] = v), o),
			{}
		);
		yield delay(4000);
		yield put(receiveUpdateCrawlSource(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteCrawlSource(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	console.log('DeleteCrawlSource Saga Action', action);
	const data = yield call(Api.delete, action.data); //data = id
	console.log('DeleteCrawlSource Saga data', data);
	yield put(receiveDeleteCrawlSource(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchAllCrawlSourcesSaga() {
	yield take(CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_FETCH_ALL);
	yield call(fetchAllCrawlSources);
}
function* createCrawlSourceSaga() {
	yield takeLatest(
		CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_CREATE,
		createCrawlSource
	);
}
function* updateCrawlSourceSaga() {
	yield takeLatest(
		CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_UPDATE,
		updateCrawlSource
	);
}
function* DeleteCrawlSourceSaga() {
	yield takeLatest(
		CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_DELETE,
		deleteCrawlSource
	);
}

export default [
	fetchAllCrawlSourcesSaga(),
	createCrawlSourceSaga(),
	updateCrawlSourceSaga(),
	DeleteCrawlSourceSaga(),
];
