import React from 'react';
import { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
	ApplicationPaths,
	QueryParameterNames,
} from './ApiAuthorizationConstants';
import authService from './AuthorizeService';
import AuthorizeRoute from './AuthorizeRoute';

export default class AuthorizeRouteByRole extends Component {
	constructor(props) {
		super(props);
		this._isMounted = false;

		this.state = {
			ready: false,
			authenticated: false,
		};
	}

	componentDidMount() {
		this._isMounted = true;

		this._subscription = authService.subscribe(() =>
			this.authenticationChanged()
		);
		this.populateAuthenticationState();
	}

	componentWillUnmount() {
		authService.unsubscribe(this._subscription);
		this._isMounted = false;
	}

	render() {
		const { ready, authenticated } = this.state;
		const redirectUrl = `${ApplicationPaths.Login}?${
			QueryParameterNames.ReturnUrl
		}=${encodeURI(window.location.href)}`;
		if (!ready) {
			return <div></div>;
		} else {
			const { component: Component, role: role, ...rest } = this.props;
			return (
				<Route
					{...rest}
					render={props => {
						if (authenticated && this.isUserInRole(role)) {
							return <Component {...props} />;
						} else {
							return <Redirect to={redirectUrl} />;
						}
					}}
				/>
			);
		}
	}

	async isUserInRole(role) {
		const _user = await authService.getUser();
		if (role == _user.role) {
			return true;
		} else {
			return false;
		}
	}

	async populateAuthenticationState() {
		const authenticated = await authService.isAuthenticated();
		if (this._isMounted) {
			this.setState({ ready: true, authenticated });
		}
	}

	async authenticationChanged() {
		if (this._isMounted) {
			this.setState({ ready: false, authenticated: false });
			await this.populateAuthenticationState();
		}
	}
}
