import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RightSidebarNav from './RightSidebarNav';
import Breadcrumb from './Breadcrumb';
import { connect } from 'react-redux';
import Loader from '../Modules/_shared/components/Loader';
// import Home from '../Modules/Home';
class Main extends Component {
	showBreadcrumb = () => {
		return <Breadcrumb />;
	};
	renderContent = () => {
		if (this.props.IsPageLoading) {
			return <Loader />;
		} else {
			return this.props.children;
		}
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
				<div className="row main-height">
					{
						//console.log('BreadCrumb', this.props)
					}
					{this.showBreadcrumb()}
					<div className="col s12 main-height">
						<div className="container main-height">
							{console.log('Main Component props:', this.props)}
							{this.renderContent()}
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

const mapStateToProps = state => {
	return {
		IsPageLoading: state.IsPageLoading,
	};
};

export default connect(mapStateToProps)(Main);
