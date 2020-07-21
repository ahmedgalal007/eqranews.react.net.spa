export const showRightNavbarAction = ShowRightNavbar => {
	return {
		type: 'AUTHENTICATION_LOGIN_SHOW_RIGHT_NAVBAR',
		payload: ShowRightNavbar,
	};
};

export const showBreadcrumbAction = ShowBreadcrumb => {
	return {
		type: 'AUTHENTICATION_LOGIN_SHOW_BREADCRUMB',
		payload: ShowBreadcrumb,
	};
};

export const showHeaderAction = ShowHeader => {
	return {
		type: 'AUTHENTICATION_LOGIN_SHOW_HEADER',
		payload: ShowHeader,
	};
};

export const showLayoutAction = Show => {
	return {
		type: 'AUTHENTICATION_LOGIN_SHOW_LAYOUT',
		payload: Show,
	};
};

export default {
	showRightNavbarAction: showRightNavbarAction,
	showBreadcrumbAction: showBreadcrumbAction,
	showHeaderAction: showHeaderAction,
	showLayoutAction: showLayoutAction,
};
