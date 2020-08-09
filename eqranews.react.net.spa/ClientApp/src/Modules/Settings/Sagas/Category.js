import {
	SETTINGS_CATEGORY_ACTIONS,
	receiveFetchAllCategories,
	receiveFetchCategoryById,
	receiveCreateCategory,
	receiveUpdateCategory,
	receiveDeleteCategory,
} from '../Actions/Category';
import { take, takeLatest, put, call, delay } from 'redux-saga/effects';
//import Api from '../Api/Category';
import ApiProxy from '../../_shared/api/ApiProxy';
const Api = ApiProxy('categories');

function* fetchAllCategories() {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.fetchAll);
	yield delay(2000);
	console.log('Categories Data From Saga', data);
	yield put(receiveFetchAllCategories(data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

function* createCategory(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		yield delay(2000);
		yield put(receiveCreateCategory(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateCategory(action) {
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
		yield put(receiveUpdateCategory(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteCategory(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	console.log('DeleteCategory Saga Action', action);
	const data = yield call(Api.delete, action.data); //data = id
	console.log('DeleteCategory Saga data', data);
	yield put(receiveDeleteCategory(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchAllCategoriesSaga() {
	yield take(SETTINGS_CATEGORY_ACTIONS.REQUEST_SETTINGS_CATEGORY_FETCH_ALL);
	yield call(fetchAllCategories);
}
function* createCategorySaga() {
	yield takeLatest(
		SETTINGS_CATEGORY_ACTIONS.REQUEST_SETTINGS_CATEGORY_CREATE,
		createCategory
	);
}
function* updateCategorySaga() {
	yield takeLatest(
		SETTINGS_CATEGORY_ACTIONS.REQUEST_SETTINGS_CATEGORY_UPDATE,
		updateCategory
	);
}
function* DeleteCategorySaga() {
	yield takeLatest(
		SETTINGS_CATEGORY_ACTIONS.REQUEST_SETTINGS_CATEGORY_DELETE,
		deleteCategory
	);
}

export default [
	fetchAllCategoriesSaga(),
	createCategorySaga(),
	updateCategorySaga(),
	DeleteCategorySaga(),
];
