import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Country from './Components/Country';
export const CountryPrefix = '/country';
export const CountryRoutes = props => {
	return (
		<Fragment>
			<Route exact path={`${CountryPrefix}`} component={Country} />
			{
				//<Route path={`${CrawlPrefix}/sources/:id`} component={CrawlSource} />
			}
		</Fragment>
	);
};

export default CountryRoutes;
