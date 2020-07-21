import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RightSidebarNav from './RightSidebarNav';
import Breadcrumb from './Breadcrumb';
// import Home from '../Modules/Home';
export default class Main extends Component {
	showBreadcrumb = () => {
		return <Breadcrumb />;
	};
	render() {
		const baseUrl = document
			.getElementsByTagName('base')[0]
			.getAttribute('href');
		return (
			<div
				id="main"
				// style={!this.props.ShowBreadcrumb ? { paddingRight: '0' } : {}}
			>
				<div className="row">
					{console.log('BreadCrumb', this.props)}
					{this.showBreadcrumb()}
					<div className="col s12">
						<div className="container">
							{console.log('Route Component:', this.props.children)}
							{this.props.children}
							{
								//<!-- START RIGHT SIDEBAR NAV -->
							}
							<RightSidebarNav />
							{
								//<!-- END RIGHT SIDEBAR NAV -->
							}
							<div
								style={{ bottom: '50px', right: '19px' }}
								className="fixed-action-btn direction-top"
							>
								<a className="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow">
									<i className="material-icons">add</i>
								</a>
								<ul>
									<li>
										<a href="css-helpers.html" className="btn-floating blue">
											<i className="material-icons">help_outline</i>
										</a>
									</li>
									<li>
										<a
											href="cards-extended.html"
											className="btn-floating green"
										>
											<i className="material-icons">widgets</i>
										</a>
									</li>
									<li>
										<a href="app-calendar.html" className="btn-floating amber">
											<i className="material-icons">today</i>
										</a>
									</li>
									<li>
										<a href="app-email.html" className="btn-floating red">
											<i className="material-icons">mail_outline</i>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="content-overlay"></div>
					</div>
				</div>
			</div>
		);
	}
}
