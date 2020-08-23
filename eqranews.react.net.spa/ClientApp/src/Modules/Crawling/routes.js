import { render } from 'react-dom';

import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Crawl from './Components/Crawl';
import CrawlSource from './Components/CrawlSource';
import CrawlStep from './Components/CrawlStep';
import CrawlStepper from './Components/CrawlStepper';
import CrawlItem from './Components/CrawlItem';

export const CrawlPrefix = '/crawl';

export const routes = {
	title: 'CRAWLING',
	icon: 'ac_unit',
	color: '#ff8765',
	routeArr: [
		{
			path: `${CrawlPrefix}`,
			exact: true,
			title: 'CRAWL',
			component: Crawl,
		},
		// {
		// 	path: `${CrawlPrefix}/source`,
		// 	exact: true,
		// 	title: 'CRAWL SOURCE',
		// 	component: CrawlSource,
		// },
		// {
		// 	path: `${CrawlPrefix}/stepper`,
		// 	exact: true,
		// 	title: 'CRAWL STEPPER ',
		// 	component: CrawlStepper,
		// },
		// {
		// 	path: `${CrawlPrefix}/step`,
		// 	exact: true,
		// 	title: 'CRAWL STEP ',
		// 	component: CrawlStep,
		// },
	],
};

export class CrawlRoutes extends React.Component {
	render() {
		return (
			<Fragment>
				<Route exact path={`${CrawlPrefix}`} component={withRouter(Crawl)} />
				<Route
					path={`${CrawlPrefix}/source/:id?`}
					component={withRouter(CrawlSource)}
				/>
				<Route
					path={`${CrawlPrefix}/stepper/:id?`}
					component={withRouter(CrawlStepper)}
				/>
				<Route
					exact
					path={`${CrawlPrefix}/step/:id?`}
					component={withRouter(CrawlStep)}
				/>
				<Route
					exact
					path={`${CrawlPrefix}/item/:id?`}
					component={withRouter(CrawlItem)}
				/>
				{
					// <Route path={`${prefix}/sources/edit/?id`} component={CrawlSourceEdit} />
				}
			</Fragment>
		);
	}
}

export default CrawlRoutes;
