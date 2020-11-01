import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import News from './Components/news';
import NewsItem from './Components/newsItem';

export const NewsPrefix = '/news';

export const routes = {
	title: 'NEWS',
	icon: 'import_contacts',
	color: '#ff8765',
	routeArr: [
		{
			path: `${NewsPrefix}`,
			exact: true,
			title: 'News List',
			component: News,
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

export class NewsRoutes extends React.Component {
	render() {
		return (
			<Fragment>
				<Route exact path={`${NewsPrefix}`} component={withRouter(News)} />
				<Route
					path={`${NewsPrefix}/newsitem/:id?`}
					component={withRouter(NewsItem)}
				/>
				{
					// <Route
					// 	path={`${NewsPrefix}/newsitem/:id?`}
					// 	component={withRouter(NewsItem)}
					// />
					// <Route path={`${prefix}/sources/edit/?id`} component={CrawlSourceEdit} />
				}
			</Fragment>
		);
	}
}

export default NewsRoutes;
