import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<footer className="page-footer footer footer-static footer-dark gradient-45deg-purple-deep-orange gradient-shadow navbar-border navbar-shadow">
				<div className="footer-copyright">
					<div className="container">
						<span>
							&copy; 2020
							<a
								href="http://themeforest.net/user/pixinvent/portfolio?ref=pixinvent"
								target="_blank"
								rel="noopener noreferrer"
							>
								PIXINVENT
							</a>
							All rights reserved.
						</span>
						<span className="right hide-on-small-only">
							Design and Developed by
							<a href="https://pixinvent.com/">PIXINVENT</a>
						</span>
					</div>
				</div>
			</footer>
		);
	}
}
