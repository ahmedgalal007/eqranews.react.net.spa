import {
	call,
	put,
	/*takeEvery,*/ takeLatest,
	delay,
} from 'redux-saga/effects';
// import Api from '...';

// // worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* fetchUser(action) {
// 	try {
// 		const user = yield call(Api.fetchUser, action.payload.userId);
// 		yield put({ type: 'USER_FETCH_SUCCEEDED', user: user });
// 	} catch (e) {
// 		yield put({ type: 'USER_FETCH_FAILED', message: e.message });
// 	}
// }

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
	// yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
	yield takeLatest('REQUEST_API_CRAWLING_SOURCES', fetchResources);
}

export const fetchData = async () => {
	try {
		const response = await fetch('Data/CrawlingSources.json');
		const data = await response.json();
		return data;
	} catch (e) {
		console.log('ERR fetchData:', e);
	}
};

function* fetchResources() {
	try {
		const data = yield call(fetchData);
		//	.then(res => res.json())
		//	.then(data => {
		//		CrawlingSources = data;
		//	});
		yield delay(4000);
		yield put({ type: 'CRAWLING_SOURCE_FETCHED', payload: data });
	} catch (e) {
		console.log('ERR fetchResources', e);
	}
}

export default mySaga;
