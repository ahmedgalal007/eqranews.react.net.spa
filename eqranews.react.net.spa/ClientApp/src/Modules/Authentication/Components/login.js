import React, { Component } from 'react';
import '../css/login.css';
// import authService from '../../../components/api-authorization/AuthorizeService';

export class Login extends Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	ready: false,
		// 	authenticated: false,
		// };

		this.updateLayout(false);
	}
	componentDidMount = () => {
		// this._subscription = authService.subscribe(() =>
		// 	this.authenticationChanged()
		// );
		this.populateAuthenticationState();
		// console.log('LoginActions:', LoginActions);
		console.log('Login Props :', this.props);
	};

	componentWillUnmount = () => {
		// authService.unsubscribe(this._subscription);
		// this.updateLayout(true);
	};

	updateLayout = enable => {
		// this.props.showHeaderAction(enable);
		// this.props.showRightNavbarAction(enable);
		// this.props.showBreadcrumbAction(enable);
		this.props.showLayoutAction(enable);
	};

	// render() {
	//     const { ready, authenticated } = this.state;
	//     const redirectUrl = `${ApplicationPaths.Login}?${QueryParameterNames.ReturnUrl}=${encodeURI(window.location.href)}`
	//     if (!ready) {
	//         return <div></div>;
	//     } else {
	//         const { component: Component, ...rest } = this.props;
	//         return <Route {...rest}
	//             render={(props) => {
	//                 if (authenticated) {
	//                     return <Component {...props} />
	//                 } else {
	//                     return <Redirect to={redirectUrl} />
	//                 }
	//             }} />
	//     }
	// }

	populateAuthenticationState = async () => {
		// const authenticated = await authService.isAuthenticated();
		// this.setState({ ready: true, authenticated });
	};

	render() {
		return (
			<div className="row">
				<div className="col s12">
					<div className="container">
						<div id="login-page" className="row">
							<div className="col s12 m6 l4 z-depth-4 card-panel border-radius-6 login-card bg-opacity-8">
								<form className="login-form">
									<div className="row">
										<div className="input-field col s12">
											<h5 className="ml-4">Sign in</h5>
										</div>
									</div>
									<div className="row margin">
										<div className="input-field col s12">
											<i className="material-icons prefix pt-2">
												person_outline
											</i>
											<input id="username" type="text" />
											<label htmlFor="username" className="center-align">
												Username
											</label>
										</div>
									</div>
									<div className="row margin">
										<div className="input-field col s12">
											<i className="material-icons prefix pt-2">lock_outline</i>
											<input id="password" type="password" />
											<label htmlFor="password">Password</label>
										</div>
									</div>
									<div className="row">
										<div className="col s12 m12 l12 ml-2 mt-1">
											<p>
												<label>
													<input type="checkbox" />
													<span>Remember Me</span>
												</label>
											</p>
										</div>
									</div>
									<div className="row">
										<div className="input-field col s12">
											<a
												href="index.html"
												className="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12"
											>
												Login
											</a>
										</div>
									</div>
									<div className="row">
										<div className="input-field col s6 m6 l6">
											<p className="margin medium-small">
												<a href="user-register.html">Register Now!</a>
											</p>
										</div>
										<div className="input-field col s6 m6 l6">
											<p className="margin right-align medium-small">
												<a href="user-forgot-password.html">
													Forgot password ?
												</a>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="content-overlay"></div>
				</div>
			</div>
		);
	}
}

export default Login;
