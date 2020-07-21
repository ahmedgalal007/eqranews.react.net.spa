import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Modules/Home';
import Crawling from './Modules/Crawling/Components/Crawling';
import About from './Modules/About';
import { FetchData } from './components/FetchData';
import CrawlSource from './Modules/Crawling/Components/CrawlSource';
import Crawl from './Modules/Crawling/Components/Crawl';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css';

export class App extends Component {
	static displayName = App.name;

	render() {
		console.log('App Props:', this.props);
		return (
			<Layout>
				<Route exact path="/" component={Home} />
				<Route exact path="/crawlsources" component={withRouter(CrawlSource)} />
				<Route exact path="/crawl" component={withRouter(Crawl)} />
				<Route exact path="/crawling" component={withRouter(Crawl)} />
				<AuthorizeRoute path="/about" component={About} />
				{
					//<AuthorizeRoute path='/fetch-data' component={FetchData} />
				}
				<Route
					path={ApplicationPaths.ApiAuthorizationPrefix}
					component={ApiAuthorizationRoutes}
				/>
			</Layout>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log('qwnProps', ownProps);
	return { ...state, ...ownProps };
};

export default connect(mapStateToProps)(App);
