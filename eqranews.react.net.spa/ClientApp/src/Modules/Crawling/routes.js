import { render } from 'react-dom';

import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Crawl from './Components/Crawl';
import CrawlSource from './Components/CrawlSource';
import CrawlingStep from './Components/CrawlingStep';
export const CrawlPrefix = '/crawl';
const CrawlRoutes = props => {
	return (
		<Fragment>
			<Route exact path={`${CrawlPrefix}`} component={Crawl} />
			<Route path={`${CrawlPrefix}/sources/:id`} component={CrawlSource} />
			<Route exact path={`${CrawlPrefix}/steps`} component={CrawlingStep} />
			{
				// <Route path={`${prefix}/sources/edit/?id`} component={CrawlSourceEdit} />
			}
		</Fragment>
	);
};

export default CrawlRoutes;
