import { routes as SettingsRoutes } from './Modules/Settings/routes';
import { routes as CrawlingRoutes } from './Modules/Crawling/routes';
import { routes as NewsRoutes } from './Modules/News/routes';
import { routes as UsersRoutes } from './Modules/Users/routes';
const routes = {
	title: 'JOBS',
	icon: 'ac_unit',
	color: '#ff8765',
	routeArr: [
		{
			path: '/hangfire',
			exact: true,
			title: 'DASHBOARD',
		},
	],
};

export default [CrawlingRoutes, SettingsRoutes, UsersRoutes];
