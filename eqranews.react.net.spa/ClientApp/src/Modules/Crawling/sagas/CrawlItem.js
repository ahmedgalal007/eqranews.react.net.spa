import {
	CRAWL_ITEM_ACTIONS,
	receiveFetchCrawlItemByStep,
	receiveFetchCrawlItemById,
	receiveCreateCrawlItem,
	receiveUpdateCrawlItem,
	receiveDeleteCrawlItem,
} from '../Actions/CrawlItem';
import {
	take,
	takeLatest,
	put,
	call,
	delay,
	takeLeading,
} from 'redux-saga/effects';
import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';

const Api = ApiProxy('crawlitems').AddApiFilter('Step');

console.log('API_WITH_FILTER_Steps:', Api);

function* fetchCrawlItemByStep(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});

		const data = yield call(Api.filterByStep, action.data);
		yield delay(2000);
		yield put(receiveFetchCrawlItemByStep(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* createCrawlItem(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		yield delay(2000);
		yield put(receiveCreateCrawlItem(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateCrawlItem(action) {
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
		yield put(receiveUpdateCrawlItem(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteCrawlItem(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.delete, action.data); //data = id
	yield put(receiveDeleteCrawlItem(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchCrawlItemByStepSaga() {
	const action = yield take(
		CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_FETCH_BY_STEP
	);
	yield call(fetchCrawlItemByStep, action);
}
function* createCrawlItemSaga() {
	yield console.log('Crawl Item Create Requested!!!');
	yield takeLatest(
		CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_CREATE,
		createCrawlItem
	);
}
function* updateCrawlItemSaga() {
	yield takeLatest(
		CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_UPDATE,
		updateCrawlItem
	);
}
function* DeleteCrawlItemSaga() {
	yield takeLatest(
		CRAWL_ITEM_ACTIONS.REQUEST_CRAWL_ITEM_DELETE,
		deleteCrawlItem
	);
}

export default [
	fetchCrawlItemByStepSaga(),
	createCrawlItemSaga(),
	updateCrawlItemSaga(),
	DeleteCrawlItemSaga(),
];
