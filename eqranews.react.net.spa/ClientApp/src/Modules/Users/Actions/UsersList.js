export const USERS_ACTIONS = {
	REQUEST_USERS_FETCH_ALL: 'REQUEST_USERS_FETCH_ALL',
	REQUEST_USERS_FETCH_BY_ROLE: 'REQUEST_USERS_FETCH_BY_ROLE',
	REQUEST_USERS_UPDATE: 'REQUEST_USERS_UPDATE',
	REQUEST_USERS_DELETE: 'REQUEST_USERS_DELETE',
	RECEIVE_USERS_FETCH_ALL: 'RECEIVE_USERS_FETCH_ALL',
	RECEIVE_USERS_FETCH_BY_ROLE: 'RECEIVE_USERS_FETCH_BY_ROLE',
	RECEIVE_USERS_UPDATE: 'RECEIVE_USERS_UPDATE',
	RECEIVE_USERS_DELETE: 'RECEIVE_USERS_DELETE',
};

export const requestFetchAllUsers = (pageNumber, usersInPage) => ({
	type: USERS_ACTIONS.REQUEST_USERS_FETCH_ALL,
	data: { pageNumber: pageNumber, usersInPage: usersInPage },
});

export const requestFetchUsersByRole = (roleName, pageNumber, usersInPage) => ({
	type: USERS_ACTIONS.REQUEST_USERS_FETCH_BY_ROLE,
	data: {
		roleName: roleName,
		pageNumber: pageNumber,
		usersInPage: usersInPage,
	},
});
export const requestUpdateUser = (id, data) => ({
	type: USERS_ACTIONS.REQUEST_USERS_UPDATE,
	data: { id: id, data: data },
});
export const requestDeleteUser = id => ({
	type: USERS_ACTIONS.REQUEST_USERS_DELETE,
	data: id,
});

// RECEIVE DATA
export const receiveFetchAllUsers = data => ({
	type: USERS_ACTIONS.RECEIVE_USERS_FETCH_ALL,
	data: data,
});
export const receiveFetchUsersByRole = data => ({
	type: USERS_ACTIONS.RECEIVE_USERS_FETCH_BY_ROLE,
	data: data,
});
export const receiveUpdateUser = data => ({
	type: USERS_ACTIONS.RECEIVE_USERS_UPDATE,
	data: data,
});
export const receiveDeleteUser = data => ({
	type: USERS_ACTIONS.RECEIVE_USERS_DELETE,
	data: data,
});
