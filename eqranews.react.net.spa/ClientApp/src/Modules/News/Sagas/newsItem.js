import {
	ACTIONS,
	receiveFetchNewsItemById,
	receiveCreateNewsItem,
	receiveUpdateNewsItem,
	receiveDeleteNewsItem,
} from '../Actions/newsItem';

import { take, takeLatest, put, call, delay } from 'redux-saga/effects';

// import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';
// const Api = ApiProxy('news').AddApiFilter('Category');

import ApiFactory from '../Api/newsItem';
const Api = ApiFactory();

function* fetchNewsItemById(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});

		const data = yield call(Api.fetchById, action.data);
		yield put(receiveFetchNewsItemById(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* createNewsItem(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		yield put(receiveCreateNewsItem(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateNewsItem(action) {
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
		yield put(receiveUpdateNewsItem(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteNewsItem(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.delete, action.data); //data = id
	yield put(receiveDeleteNewsItem(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export

function* fetchNewsItemByIdSaga() {
	const action = yield take(ACTIONS.REQUEST_NEWS_ITEM_FETCH_BY_ID);
	yield call(fetchNewsItemById, action);
}
function* createNewsItemSaga() {
	yield console.log('Crawl Item Create Requested!!!');
	yield takeLatest(ACTIONS.REQUEST_NEWS_ITEM_CREATE, createNewsItem);
}
function* updateNewsItemSaga() {
	yield takeLatest(ACTIONS.REQUEST_NEWS_ITEM_UPDATE, updateNewsItem);
}
function* DeleteNewsItemSaga() {
	yield takeLatest(ACTIONS.REQUEST_NEWS_ITEM_DELETE, deleteNewsItem);
}

export default [
	fetchNewsItemByIdSaga(),
	createNewsItemSaga(),
	updateNewsItemSaga(),
	DeleteNewsItemSaga(),
];
