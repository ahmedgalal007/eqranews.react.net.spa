import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Country from './Components/Country';
import CountryForm from './Components/CountryForm';
import Category from './Components/Category';
import CategoryForm from './Components/CategoryForm';
import CrawlStepType from './Components/CrawlStepType';
import CrawlStepTypeForm from './Components/CrawlStepTypeForm';

export const SettingsPrefix = '/settings';

export const routes = {
	title: 'SETTINGS',
	icon: 'settings',
	color: '#ff8765',
	routeArr: [
		{
			path: `${SettingsPrefix}/countries`,
			exact: true,
			title: 'COUNTRIES',
			component: Country,
		},
		{
			path: `${SettingsPrefix}/categories`,
			exact: true,
			title: 'CATEGPRIES',
			component: Category,
		},
		{
			path: `${SettingsPrefix}/crawlsteptypes`,
			exact: true,
			title: 'CRAWL STEP TYPES',
			component: CrawlStepType,
		},
	],
};

export class SettingsRoutes extends React.Component {
	render() {
		return (
			<Fragment>
				<Route
					exact
					path={`${SettingsPrefix}/countries`}
					component={withRouter(Country)}
				/>
				{
					<Route
						path={`${SettingsPrefix}/country/:id?`}
						component={withRouter(CountryForm)}
					/>
				}
				<Route
					exact
					path={`${SettingsPrefix}/categories`}
					component={withRouter(Category)}
				/>
				{
					<Route
						path={`${SettingsPrefix}/category/:id?`}
						component={withRouter(CategoryForm)}
					/>
				}
				<Route
					exact
					path={`${SettingsPrefix}/crawlsteptypes`}
					component={withRouter(CrawlStepType)}
				/>
				{
					<Route
						path={`${SettingsPrefix}/crawlsteptype/:id?`}
						component={withRouter(CrawlStepTypeForm)}
					/>
				}
			</Fragment>
		);
	}
}

export default SettingsRoutes;
