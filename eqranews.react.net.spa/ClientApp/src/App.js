import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Layout from './Layout';
import Home from './Modules/Home';
import About from './Modules/About';
import { FetchData } from './components/FetchData';
import CrawlSource from './Modules/Crawling/Components/CrawlSource';
import Crawl from './Modules/Crawling/Components/Crawl';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import AuthorizeRouteByRole from './components/api-authorization/AuthorizeRouteByRole';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css';
import CrawlRoutes, { CrawlPrefix } from './Modules/Crawling/routes';
import { SettingsRoutes, SettingsPrefix } from './Modules/Settings/routes';
import { NewsRoutes, NewsPrefix } from './Modules/News/routes';
import { UsersRoutes, UsersPrefix } from './Modules/Users/routes';

import NotFound from './Modules/_shared/components/NotFound';

export class App extends Component {
	static displayName = App.name;

	render() {
		// console.log('App Props:', this.props);
		return (
			<Layout>
				<AuthorizeRouteByRole
					role="Administrator"
					exact
					path="/"
					component={Home}
				/>
				<Route path={CrawlPrefix} component={withRouter(CrawlRoutes)} />
				<Route path={SettingsPrefix} component={withRouter(SettingsRoutes)} />
				<Route path={NewsPrefix} component={withRouter(NewsRoutes)} />
				<Route path={UsersPrefix} component={withRouter(UsersRoutes)} />
				<AuthorizeRoute path="/about" component={About} />
				{
					//<AuthorizeRoute path='/fetch-data' component={FetchData} />
				}
				<Route
					path={ApplicationPaths.ApiAuthorizationPrefix}
					component={ApiAuthorizationRoutes}
				/>
				<Route path="/not-found" component={NotFound} />
			</Layout>
		);
	}
}

// const mapStateToProps = state => {
// 	//console.log('qwnProps', ownProps);
// 	return state;
// };

export default App;
