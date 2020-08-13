import {
	SETTINGS_CRAWLSTEPTYPE_ACTIONS,
	receiveFetchAllCrawlStepTypes,
	receiveFetchCrawlStepTypeById,
	receiveCreateCrawlStepType,
	receiveUpdateCrawlStepType,
	receiveDeleteCrawlStepType,
} from '../Actions/CrawlStepType';
import { take, takeLatest, put, call, delay } from 'redux-saga/effects';
//import Api from '../Api/CrawlStepType';
import ApiProxy from '../../_shared/api/ApiProxy';
const Api = ApiProxy('CrawlSetpTypes');

function* fetchAllCrawlStepTypes() {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.fetchAll);
	yield delay(4000);
	yield put(receiveFetchAllCrawlStepTypes(data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

function* createCrawlStepType(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		yield delay(4000);
		yield put(receiveCreateCrawlStepType(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateCrawlStepType(action) {
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
		yield put(receiveUpdateCrawlStepType(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteCrawlStepType(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.delete, action.data); //data = id
	yield put(receiveDeleteCrawlStepType(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchAllCrawlStepTypesSaga() {
	yield take(
		SETTINGS_CRAWLSTEPTYPE_ACTIONS.REQUEST_SETTINGS_CRAWLSTEPTYPE_FETCH_ALL
	);
	yield call(fetchAllCrawlStepTypes);
}
function* createCrawlStepTypeSaga() {
	console.log('SAGA Intercept crawlsteptype');
	yield takeLatest(
		SETTINGS_CRAWLSTEPTYPE_ACTIONS.REQUEST_SETTINGS_CRAWLSTEPTYPE_CREATE,
		createCrawlStepType
	);
}
function* updateCrawlStepTypeSaga() {
	yield takeLatest(
		SETTINGS_CRAWLSTEPTYPE_ACTIONS.REQUEST_SETTINGS_CRAWLSTEPTYPE_UPDATE,
		updateCrawlStepType
	);
}
function* DeleteCrawlStepTypeSaga() {
	yield takeLatest(
		SETTINGS_CRAWLSTEPTYPE_ACTIONS.REQUEST_SETTINGS_CRAWLSTEPTYPE_DELETE,
		deleteCrawlStepType
	);
}

export default [
	fetchAllCrawlStepTypesSaga(),
	createCrawlStepTypeSaga(),
	updateCrawlStepTypeSaga(),
	DeleteCrawlStepTypeSaga(),
];
