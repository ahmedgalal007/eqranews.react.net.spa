export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = state => {
	// try {
	// 	const serializedState = JSON.stringify(state);
	// 	localStorage.setItem('state', serializedState);
	// } catch (err) {
	// 	// Ignore Errors Now
	// }

	return next => action => {
		const result = next(action);
		localStorage.setItem('state', JSON.stringify(state));
		return result;
	};
};
