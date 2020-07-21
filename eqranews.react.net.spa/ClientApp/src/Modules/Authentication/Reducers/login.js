export const showRightNavbar = (ShowRightNavbar = true, Action) => {
	if (Action.type === 'AUTHENTICATION_LOGIN_SHOW_RIGHT_NAVBAR') {
		return Action.payload;
	}
	return ShowRightNavbar;
};

export const showBreadcrumb = (ShowBreadcrumb = true, Action) => {
	if (Action.type === 'AUTHENTICATION_LOGIN_SHOW_BREADCRUMB') {
		return Action.payload;
	}
	return ShowBreadcrumb;
};

export const showHeader = (ShowHeader = true, Action) => {
	if (Action.type === 'AUTHENTICATION_LOGIN_SHOW_HEADER') {
		return Action.payload;
	}
	return ShowHeader;
};

export const showLayout = (ShowAll = true, Action) => {
	if (Action.type === 'AUTHENTICATION_LOGIN_SHOW_LAYOUT') {
		return Action.payload;
	}
	return ShowAll;
};

export default {
	showRightNavbar,
	showBreadcrumb,
	showHeader,
	showLayout,
};
