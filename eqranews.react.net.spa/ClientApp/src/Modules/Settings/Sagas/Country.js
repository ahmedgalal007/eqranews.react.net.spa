import {
	SETTINGS_COUNTRY_ACTIONS,
	receiveFetchAllCountries,
	receiveFetchCountryById,
	receiveCreateCountry,
	receiveUpdateCountry,
	receiveDeleteCountry,
} from '../Actions/Country';
import {
	take,
	takeLatest,
	put,
	call,
	delay,
	takeEvery,
} from 'redux-saga/effects';
// import Api from '../Api/Country';
import ApiProxy from '../../_shared/api/ApiProxy';
const Api = ApiProxy('countries');

function* fetchAllCountries() {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.fetchAll);
	// const data = yield call(() => {
	// 	return [
	// 		{ Id: 1, Name: 'Egypt', IsoCode: 'EG' },
	// 		{ Id: 2, Name: 'Saudi Erabia', IsoCode: 'SA' },
	// 		{ Id: 3, Name: 'Kuwait', IsoCode: 'KW' },
	// 	];
	// });
	yield put(receiveFetchAllCountries(data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

function* createCountry(action) {
	try {
		yield put({
			type: 'PAGE_LOADING',
			data: true,
		});
		const data = yield call(Api.create, action.data); // data= newRecord
		yield put(receiveCreateCountry(data));
		// yield call(fetchAllCountries);
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* updateCountry(action) {
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
		yield put(receiveUpdateCountry(data));
		yield put({
			type: 'PAGE_LOADING',
			data: false,
		});
	} catch (err) {
		console.log(err);
	}
}

function* deleteCountry(action) {
	yield put({
		type: 'PAGE_LOADING',
		data: true,
	});
	const data = yield call(Api.delete, action.data); //data = id
	yield put(receiveDeleteCountry(data.data));
	yield put({
		type: 'PAGE_LOADING',
		data: false,
	});
}

// All the Sagas Catchers to Export
function* fetchAllCountriesSaga() {
	while (true) {
		const action = yield take(
			SETTINGS_COUNTRY_ACTIONS.REQUEST_SETTINGS_COUNTRY_FETCH_ALL
		);
		yield call(fetchAllCountries, action);
	}
}
function* createCountrySaga() {
	yield takeLatest(
		SETTINGS_COUNTRY_ACTIONS.REQUEST_SETTINGS_COUNTRY_CREATE,
		createCountry
	);
}
function* updateCountrySaga() {
	yield takeLatest(
		SETTINGS_COUNTRY_ACTIONS.REQUEST_SETTINGS_COUNTRY_UPDATE,
		updateCountry
	);
}
function* DeleteCountrySaga() {
	yield takeLatest(
		SETTINGS_COUNTRY_ACTIONS.REQUEST_SETTINGS_COUNTRY_DELETE,
		deleteCountry
	);
}

export default [
	fetchAllCountriesSaga(),
	createCountrySaga(),
	updateCountrySaga(),
	DeleteCountrySaga(),
];
