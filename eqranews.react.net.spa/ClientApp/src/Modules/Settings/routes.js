import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Country from './Components/Country';
import CountryForm from './Components/CountryForm';
import Category from './Components/Category';
import CategoryForm from './Components/CategoryForm';

export const SettingsPrefix = '/settings';
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
		</Fragment>
	);
};

export default SettingsRoutes;
