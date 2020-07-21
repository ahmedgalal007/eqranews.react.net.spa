import React, { Component } from 'react';

export class Breadcrumb extends Component {
	render() {
		return (
			<div className="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
				{
					//<!-- Search for small screen-->
				}
				<div className="container">
					<div className="row">
						<div className="col s10 m6 l6 breadcrumbs-left">
							<h5 className="breadcrumbs-title mt-0 mb-0 display-inline hide-on-small-and-down">
								<span>Blank Page</span>
							</h5>
							<ol className="breadcrumbs mb-0">
								<li className="breadcrumb-item">
									<a href="index.html">Home</a>
								</li>
								<li className="breadcrumb-item">
									<a href="/">Pages</a>
								</li>
								<li className="breadcrumb-item active">Blank Page</li>
							</ol>
						</div>
						<div className="col s2 m6 l6">
							<a
								className="btn btn-floating dropdown-settings waves-effect waves-light breadcrumbs-btn right"
								href="#!"
								data-target="dropdown1"
							>
								<i className="material-icons">expand_more </i>
								<i className="material-icons right">arrow_drop_down</i>
							</a>
							<ul className="dropdown-content" id="dropdown1" tabIndex="0">
								<li tabIndex="0">
									<a
										className="grey-text text-darken-2"
										href="user-profile-page.html"
									>
										Profile<span className="new badge red">2</span>
									</a>
								</li>
								<li tabIndex="0">
									<a
										className="grey-text text-darken-2"
										href="app-contacts.html"
									>
										Contacts
									</a>
								</li>
								<li tabIndex="0">
									<a className="grey-text text-darken-2" href="page-faq.html">
										FAQ
									</a>
								</li>
								<li className="divider" tabIndex="-1"></li>
								<li tabIndex="0">
									<a className="grey-text text-darken-2" href="user-login.html">
										Logout
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Breadcrumb;
