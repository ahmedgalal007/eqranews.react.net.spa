import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import UsersList from './Components/UsersList';

export const UsersPrefix = '/users';

export const routes = {
	title: 'USERS',
	icon: 'person',
	color: '#ff8765',
	routeArr: [
		{
			path: `${UsersPrefix}`,
			exact: true,
			title: 'Users List',
			component: UsersList,
		},
	],
};

export class UsersRoutes extends React.Component {
	render() {
		return (
			<Fragment>
				<Route
					exact
					path={`${UsersPrefix}`}
					component={withRouter(UsersList)}
				/>
			</Fragment>
		);
	}
}

export default UsersRoutes;
