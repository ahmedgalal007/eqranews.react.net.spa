import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Country from './Components/Country';
import CountryForm from './Components/CountryForm';
export const SettingsPrefix = '/settings/country';
export const SettingsRoutes = props => {
	return (
		<Fragment>
			<Route exact path={`${SettingsPrefix}`} component={Country} />
			{<Route path={`${SettingsPrefix}/:id`} component={CountryForm} />}
		</Fragment>
	);
};

export default SettingsRoutes;
