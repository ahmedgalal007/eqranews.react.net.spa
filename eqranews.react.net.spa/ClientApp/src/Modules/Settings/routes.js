import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
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

export const SettingsRoutes = props => {
	return (
		<Fragment>
			<Route exact path={`${SettingsPrefix}/countries`} component={Country} />
			{
				<Route
					path={`${SettingsPrefix}/country/:id?`}
					component={CountryForm}
				/>
			}
			<Route exact path={`${SettingsPrefix}/categories`} component={Category} />
			{
				<Route
					path={`${SettingsPrefix}/category/:id?`}
					component={CategoryForm}
				/>
			}
			<Route
				exact
				path={`${SettingsPrefix}/crawlsteptypes`}
				component={CrawlStepType}
			/>
			{
				<Route
					path={`${SettingsPrefix}/crawlsteptype/:id?`}
					component={CrawlStepTypeForm}
				/>
			}
		</Fragment>
	);
};

export default SettingsRoutes;
