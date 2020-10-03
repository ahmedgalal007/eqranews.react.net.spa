import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AsideNav from './AsideNav';
import AppRoutes from '../routes';

export class Aside extends Component {
	componentDidUpdate = () => {
		this.el
			.querySelectorAll('a, li')
			.forEach(a => a.classList.remove('active'));
		const selected = this.el.querySelector(
			`a[href="${this.props.history.location.pathname}"]`
		);
		if (selected) {
			selected.classList.add('active');
			let parent = selected;
			while (parent && parent != this.el) {
				parent = parent.parentNode;
				if (parent.tagName == 'LI') parent.classList.add('active');
			}
		}
	};
	render() {
		return (
			<aside className="sidenav-main nav-expanded nav-lock nav-collapsible sidenav-light navbar-full sidenav-active-rounded">
				<div className="brand-sidebar">
					<h1 className="logo-wrapper">
						<a className="brand-logo darken-1" href="index.html">
							<img
								src="app-assets/images/logo/materialize-logo.png"
								alt="materialize logo"
							/>
							<span className="logo-text hide-on-med-and-down">إقرأ نيوز</span>
						</a>
						<a className="navbar-toggler">
							<i className="material-icons">radio_button_checked</i>
						</a>
					</h1>
				</div>
				<ul
					ref={el => (this.el = el)}
					className="sidenav sidenav-collapsible leftside-navigation collapsible sidenav-fixed menu-shadow"
					id="slide-out"
					data-menu="menu-navigation"
					data-collapsible="menu-accordion"
				>
					{AppRoutes.map((x, i) => {
						return <AsideNav key={i} routes={x} />;
					})}
					<li className="active bold">
						<a className="collapsible-header waves-effect waves-cyan" href="#">
							<i className="material-icons">pages</i>
							<span className="menu-title" data-i18n="Pages">
								Pages
							</span>
						</a>
						<div className="collapsible-body">
							<ul
								className="collapsible collapsible-sub"
								data-collapsible="accordion"
							>
								<li className="active">
									<a className="active" href="page-blank.html">
										<i className="material-icons">radio_button_unchecked</i>
										<span data-i18n="Page Blank">Page Blank</span>
									</a>
								</li>
							</ul>
						</div>
					</li>
					<li className="navigation-header">
						<a className="navigation-header-text" href="/hangfire">
							JOBS{' '}
						</a>
						<i className="navigation-header-icon material-icons">more_horiz</i>
					</li>
					<li className="bold">
						<a className="collapsible-header waves-effect waves-cyan" href="#">
							<i className="material-icons">photo_filter</i>
							<span className="menu-title" data-i18n="Menu levels">
								Menu levels
							</span>
						</a>
						<div className="collapsible-body">
							<ul
								className="collapsible collapsible-sub"
								data-collapsible="accordion"
							>
								<li>
									<a href="#">
										<i className="material-icons">radio_button_unchecked</i>
										<span data-i18n="Second level">Second level</span>
									</a>
								</li>
								<li>
									<a
										className="collapsible-header waves-effect waves-cyan"
										href="#"
									>
										<i className="material-icons">radio_button_unchecked</i>
										<span data-i18n="Second level child">
											Second level child
										</span>
									</a>
									<div className="collapsible-body">
										<ul className="collapsible" data-collapsible="accordion">
											<li>
												<a href="#">
													<i className="material-icons">
														radio_button_unchecked
													</i>
													<span data-i18n="Third level">Third level</span>
												</a>
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</li>
					<li className="bold">
						<a
							className="waves-effect waves-cyan"
							href="https://pixinvent.com/materialize-material-design-admin-template/documentation/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="material-icons">import_contacts</i>
							<span className="menu-title" data-i18n="Documentation">
								Documentation
							</span>
						</a>
					</li>
					<li className="bold">
						<a
							className="waves-effect waves-cyan"
							href="https://pixinvent.ticksy.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="material-icons">help_outline</i>
							<span className="menu-title" data-i18n="Support">
								Support
							</span>
						</a>
					</li>
				</ul>
				<div className="navigation-background"></div>
				<a
					className="sidenav-trigger btn-sidenav-toggle btn-floating btn-medium waves-effect waves-light hide-on-large-only"
					href="#"
					data-target="slide-out"
				>
					<i className="material-icons">menu</i>
				</a>
			</aside>
		);
	}
}

const mapStateToProps = state => {
	console.log('ASIDE:', state);
	return {
		CurrentPage: state.RouterCurrentPage,
		history: state.history,
	};
};

export default connect(mapStateToProps)(withRouter(Aside));
