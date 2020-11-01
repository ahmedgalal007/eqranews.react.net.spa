import {
	ACTIONS,
	receiveFetchAllNews,
	receiveFetchNewsByCategory,
	receiveFetchNewsById,
	receiveCreateNews,
	receiveUpdateNews,
	receiveDeleteNews,
} from '../Actions/news';

import {
	take,
	takeLatest,
	put,
	call,
	delay,
	takeLeading,
} from 'redux-saga/effects';

// import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';
// const Api = ApiProxy('news').AddApiFilter('Category');

import ApiFactory from '../Api/news';
const Api = ApiFactory();
console.log('API_WITH_FILTER_NEWS:', Api);

function* fetchAllNews() {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.fetchAll);
		yield delay(2000);
		yield put(receiveFetchAllNews(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* fetchNewsByCategory(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});

		const data = yield call(Api.filterByCategory, action.data);
		yield put(receiveFetchNewsByCategory(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* createNews(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		yield put(receiveCreateNews(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateNews(action) {
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
		yield put(receiveUpdateNews(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteNews(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.delete, action.data); //data = id
	yield put(receiveDeleteNews(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchAllNewsSaga() {
	const action = yield take(ACTIONS.REQUEST_NEWS_FETCH_ALL);
	yield call(fetchAllNews, action);
}
function* fetchNewsByCategorySaga() {
	const action = yield take(ACTIONS.REQUEST_NEWS_FETCH_BY_CATEGORY);
	yield call(fetchNewsByCategory, action);
}
function* createNewsSaga() {
	yield console.log('Crawl Item Create Requested!!!');
	yield takeLatest(ACTIONS.REQUEST_NEWS_CREATE, createNews);
}
function* updateNewsSaga() {
	yield takeLatest(ACTIONS.REQUEST_NEWS_UPDATE, updateNews);
}
function* DeleteNewsSaga() {
	yield takeLatest(ACTIONS.REQUEST_NEWS_DELETE, deleteNews);
}

export default [
	fetchAllNewsSaga(),
	fetchNewsByCategorySaga(),
	createNewsSaga(),
	updateNewsSaga(),
	DeleteNewsSaga(),
];
