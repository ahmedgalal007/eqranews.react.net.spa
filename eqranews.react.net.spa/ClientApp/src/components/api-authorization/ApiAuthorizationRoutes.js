import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Login } from './Login';
// import { Login } from '../../Modules/Authentication/Components/login';
import { Logout } from './Logout';
import {
	ApplicationPaths,
	LoginActions,
	LogoutActions,
} from './ApiAuthorizationConstants';

import reduxLoginActions from '../../Modules/Authentication/Actions/login';

class ApiAuthorizationRoutes extends Component {
	_IsMounted = false;
	componentDidMount = () => {
		this.state = {};
	};

	componentWillMount = () => {
		// this.setState = (state, callback) => {
		// 	return;
		// };
	};
	loginAction = name => {
		return connect((state, ownProps) => {
			return { ...ownProps, ...state, action: name };
		}, reduxLoginActions)(Login);
	};

	logoutAction = name => {
		return connect((state, ownProps) => {
			return { ...ownProps, ...state, action: name };
		})(Logout);
	};

	render() {
		return (
			<Fragment>
				<Route
					path={ApplicationPaths.Login}
					component={this.loginAction(LoginActions.Login)}
				/>
				<Route
					path={ApplicationPaths.LoginFailed}
					component={this.loginAction(LoginActions.LoginFailed)}
				/>
				<Route
					path={ApplicationPaths.LoginCallback}
					component={this.loginAction(LoginActions.LoginCallback)}
				/>
				<Route
					path={ApplicationPaths.Profile}
					component={this.loginAction(LoginActions.Profile)}
				/>
				<Route
					path={ApplicationPaths.Register}
					component={this.loginAction(LoginActions.Register)}
				/>
				<Route
					path={ApplicationPaths.LogOut}
					component={this.logoutAction(LogoutActions.Logout)}
				/>
				<Route
					path={ApplicationPaths.LogOutCallback}
					component={this.logoutAction(LogoutActions.LogoutCallback)}
				/>
				<Route
					path={ApplicationPaths.LoggedOut}
					component={this.logoutAction(LogoutActions.LoggedOut)}
				/>
			</Fragment>
		);
	}
}

export default ApiAuthorizationRoutes;
