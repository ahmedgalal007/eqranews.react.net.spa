import {
	CRAWL_STEP_ACTIONS,
	receiveFetchCrawlStepByStepper,
	receiveFetchCrawlStepById,
	receiveCreateCrawlStep,
	receiveUpdateCrawlStep,
	receiveDeleteCrawlStep,
} from '../Actions/CrawlStep';
import {
	take,
	takeLatest,
	put,
	call,
	delay,
	takeEvery,
	takeLeading,
} from 'redux-saga/effects';
import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';

const Api = ApiProxy('CrawlSteps').AddApiFilter('Stepper');

console.log('API_WITH_FILTER_Steps:', Api);

function* fetchCrawlStepByStepper(action) {
	yield console.log('fetchCrawlStepByStepper Received!!!');
	console.log('Catch Fetch by Stepper');

	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});

		const data = yield call(Api.filterByStepper, action.data);
		// yield delay(2000);
		yield put(receiveFetchCrawlStepByStepper(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* createCrawlStep(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		// yield delay(2000);
		yield put(receiveCreateCrawlStep(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateCrawlStep(action) {
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
		// yield delay(4000);
		yield put(receiveUpdateCrawlStep(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteCrawlStep(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.delete, action.data); //data = id
	yield put(receiveDeleteCrawlStep(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchCrawlStepByStepperSaga() {
	while (true) {
		console.log('receiving fetching crawl steps by staepper in Saga');
		const action = yield take(
			CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_FETCH_BY_STEPPER
		);
		yield call(fetchCrawlStepByStepper, action);
	}
}

function* createCrawlStepSaga() {
	yield console.log('Crawl Stepper Create Requested!!!');
	yield takeLatest(
		CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_CREATE,
		createCrawlStep
	);
}

function* updateCrawlStepSaga() {
	yield takeLatest(
		CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_UPDATE,
		updateCrawlStep
	);
}
function* DeleteCrawlStepSaga() {
	yield takeLatest(
		CRAWL_STEP_ACTIONS.REQUEST_CRAWL_STEP_DELETE,
		deleteCrawlStep
	);
}

export default [
	fetchCrawlStepByStepperSaga(),
	createCrawlStepSaga(),
	updateCrawlStepSaga(),
	DeleteCrawlStepSaga(),
];
