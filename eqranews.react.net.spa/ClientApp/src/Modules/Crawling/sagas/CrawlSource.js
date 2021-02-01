import {
	CRAWL_SOURCE_ACTIONS,
	receiveFetchAllCrawlSources,
	receiveFetchCrawlSourceById,
	receiveCreateCrawlSource,
	receiveUpdateCrawlSource,
	receiveDeleteCrawlSource,
} from '../Actions/CrawlSource';
import { receiveFetchAllCountries } from '../../Settings/Actions/Country';
import { receiveFetchAllCategories} from '../../Settings/Actions/Category';
import { receiveFetchAllCrawlStepTypes} from '../../Settings/Actions/CrawlStepType';

import { take, takeLatest, put, call, delay } from 'redux-saga/effects';
//import Api from '../Api/CrawlSource';
import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';

const Api = ApiProxy('crawlsources');
const ApiCountry = ApiProxy('countries');
const ApiCategory = ApiProxy('categories');
const ApiCST = ApiProxy('CrawlSetpTypes');

// const ApiStepper = AddApiFilter(ApiProxy('crawlsteppers'), 'Source');


function* fetchAllCrawlSources(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});

		let response = yield call(ApiCountry.fetchAll);
		const countries = response.data;
		yield put(receiveFetchAllCountries(countries));
		response = yield call(ApiCategory.fetchAll);
		const categories = response.data;
		yield put(receiveFetchAllCategories(categories));
		response = yield call(ApiCST.fetchAll);
		const CST = response.data;
		yield put(receiveFetchAllCrawlStepTypes(CST));
		response = yield call(Api.fetchAll);
		const { data } = response;
		yield put(receiveFetchAllCrawlSources(data));
		if (action.data.callback) {
			action.data.callback();
			console.log('Action Callback Running!!!!');
		}
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
		yield put(receiveCreateCrawlSource(data));
		// yield call(fetchAllCrawlSources);
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
		yield put(receiveUpdateCrawlSource(data));
		// yield call(fetchAllCrawlSources);
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
	while (true) {
		const action = yield take(
			CRAWL_SOURCE_ACTIONS.REQUEST_CRAWL_SOURCE_FETCH_ALL
		);
		yield call(fetchAllCrawlSources, action);
	}
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
