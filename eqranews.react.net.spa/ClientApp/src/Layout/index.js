import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Footer from './Footer';
import Header from './Header';
import DefaultSearchMain from './Search/DefaultSearchMain';
import PageSearchTitle from './Search/PageSearchTitle';
import SearchNotFound from './Search/SearchNotFound';
import Aside from './Aside';
import Main from './Main';

export class Layout extends Component {
	static displayName = Layout.name;
	componentDidMount = () => {
		//const root = document.querySelector('#root');
		const root = document.body;
		root.classList.add(
			'vertical-layout',
			'page-header-light',
			'vertical-menu-collapsible',
			'vertical-menu-nav-dark',
			'preload-transitions',
			'2-columns'
		);
		root.setAttribute('data-open', 'click');
		root.setAttribute('data-menu', 'vertical-menu-nav-dark');
		root.setAttribute('data-col', '2-columns');
	};

	render() {
		console.log('Layout Props:', this.props);
		let header, breadcrumb, rightNavbar;
		//if (this.props.showLayout) {
		header = <Header />;
		//}
		//if (this.props.showLayout) {
		breadcrumb = (
			<Fragment>
				<DefaultSearchMain />
				<PageSearchTitle />
				<SearchNotFound />
			</Fragment>
		);
		//}
		//if (this.props.showLayout) {
		rightNavbar = <Aside />;
		//}

		return (
			<Fragment>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				{header}

				{breadcrumb}

				{rightNavbar}

				<Main>{this.props.children}</Main>
				<Footer />
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Layout);
