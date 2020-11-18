import {
	CRAWL_STEPPER_ACTIONS,
	receiveFetchCrawlStepperBySource,
	receiveFetchCrawlStepperById,
	receiveCreateCrawlStepper,
	receiveUpdateCrawlStepper,
	receiveDeleteCrawlStepper,
} from '../Actions/CrawlStepper';
import {
	take,
	takeLatest,
	put,
	call,
	delay,
	takeLeading,
} from 'redux-saga/effects';
//import Api from '../Api/CrawlStepper';
import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';

// const Api = ApiProxy('crawlsteppers');
// const Api = AddApiFilter(ApiProxy('CrawlSteppers'), 'Source');
const Api = ApiProxy('crawlsteppers').AddApiFilter('Source');

console.log('API_WITH_FILTER_Stepper:', Api);

function* fetchCrawlStepperBySource(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		yield console.log('SAGA GET Stepper Action', action);
		yield console.log('filterBySource:', Api.filterBySource);
		const data = yield call(Api.filterBySource, action.data);
		//const data = yield call(Api.applyFilter, 'Source', action.data);
		yield delay(2000);
		console.log('CrawlSteppers Data From Saga', data);
		yield put(receiveFetchCrawlStepperBySource(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* createCrawlStepper(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		console.log('SAGA Create Stepper Action', action);
		const data = yield call(Api.create, action.data); // data= newRecord
		yield delay(2000);
		yield put(receiveCreateCrawlStepper(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateCrawlStepper(action) {
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
		yield put(receiveUpdateCrawlStepper(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteCrawlStepper(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	console.log('DeleteCrawlStepper Saga Action', action);
	const data = yield call(Api.delete, action.data); //data = id
	console.log('DeleteCrawlStepper Saga data', data);
	yield put(receiveDeleteCrawlStepper(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchCrawlStepperBySourceSaga() {
	while (true) {
		const action = yield take(
			CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_FETCH_BY_SOURCE
		);
		yield call(fetchCrawlStepperBySource, action);
	}
}

function* createCrawlStepperSaga() {
	yield console.log('Crawl Stepper Create Requested!!!');
	yield takeLatest(
		CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_CREATE,
		createCrawlStepper
	);
}
function* updateCrawlStepperSaga() {
	yield takeLatest(
		CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_UPDATE,
		updateCrawlStepper
	);
}
function* DeleteCrawlStepperSaga() {
	yield takeLatest(
		CRAWL_STEPPER_ACTIONS.REQUEST_CRAWL_STEPPER_DELETE,
		deleteCrawlStepper
	);
}

export default [
	fetchCrawlStepperBySourceSaga(),
	createCrawlStepperSaga(),
	updateCrawlStepperSaga(),
	DeleteCrawlStepperSaga(),
];
