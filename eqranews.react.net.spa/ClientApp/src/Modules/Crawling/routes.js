import { render } from 'react-dom';

import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Crawl from './Components/Crawl';
import CrawlSource from './Components/CrawlSource';
import CrawlStep from './Components/CrawlStep';
import CrawlStepper from './Components/CrawlStepper';

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
		{
			path: `${CrawlPrefix}/source`,
			exact: true,
			title: 'CRAWL SOURCE',
			component: CrawlSource,
		},
		{
			path: `${CrawlPrefix}/stepper`,
			exact: true,
			title: 'CRAWL STEPPER ',
			component: CrawlStepper,
		},
		{
			path: `${CrawlPrefix}/steps`,
			exact: true,
			title: 'CRAWL STEP ',
			component: CrawlStep,
		},
	],
};

const CrawlRoutes = props => {
	return (
		<Fragment>
			<Route exact path={`${CrawlPrefix}`} component={Crawl} />
			<Route path={`${CrawlPrefix}/source/:id?`} component={CrawlSource} />
			<Route path={`${CrawlPrefix}/stepper/:id?`} component={CrawlStepper} />
			<Route exact path={`${CrawlPrefix}/steps`} component={CrawlStep} />
			{
				// <Route path={`${prefix}/sources/edit/?id`} component={CrawlSourceEdit} />
			}
		</Fragment>
	);
};

export default CrawlRoutes;
