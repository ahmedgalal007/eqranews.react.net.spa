import {
	USERS_ACTIONS,
	receiveFetchAllUsers,
	receiveFetchUsersByRole,
	receiveUpdateUser,
	receiveDeleteUser,
} from '../Actions/UsersList';
import {
	take,
	takeLatest,
	put,
	call,
	delay,
	takeLeading,
} from 'redux-saga/effects';
// import ApiProxy, { AddApiFilter } from '../../_shared/api/ApiProxy';
import ApiFactory from '../Api/UsersList';
// const Api = ApiProxy('users').AddApiFilter('Step');
const Api = ApiFactory();

console.log('API_WITH_FILTER_Steps:', Api);

function* fetchUsers(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const obj2Arr = Object.keys(action.data).map(key => action.data[key]);
		console.log('Yeild call Action Data:', obj2Arr);
		const data = yield call(Api.fetchAll, obj2Arr);
		yield put(receiveFetchAllUsers(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* fetchUsersByRole(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});

		const data = yield call(Api.fetchByRole, action.data);
		yield put(receiveFetchUsersByRole(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateUsers(action) {
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
		yield put(receiveUpdateUser(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteUsers(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.delete, action.data); //data = id
	yield put(receiveDeleteUser(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchAllUsersSaga() {
	const action = yield take(USERS_ACTIONS.REQUEST_USERS_FETCH_ALL);
	yield call(fetchUsers, action);
}

function* fetchUsersByRoleSaga() {
	const action = yield take(USERS_ACTIONS.REQUEST_USERS_FETCH_BY_ROLE);
	yield call(fetchUsersByRole, action);
}

function* updateUsersSaga() {
	yield takeLatest(USERS_ACTIONS.REQUEST_USERS_UPDATE, updateUsers);
}
function* DeleteUsersSaga() {
	yield takeLatest(USERS_ACTIONS.REQUEST_USERS_DELETE, deleteUsers);
}

export default [
	fetchAllUsersSaga(),
	fetchUsersByRoleSaga(),
	updateUsersSaga(),
	DeleteUsersSaga(),
];
