export const SCRIPT_SECTIONS = {
	VENDOR_JS: { id: '#VENDOR_JS', scripts: [] },
	PAGE_VENDOR_JS: { id: '#PAGE_VENDOR_JS', scripts: [] },
	THEME_JS: { id: '#THEME_JS', scripts: [] },
	PAGE_LEVEL_JS: { id: '#PAGE_LEVEL_JS', scripts: [] },
};

export const appendScript = (
	script,
	selector = 'body',
	id = null,
	IsAfter = false
) => {
	if (!(selector instanceof HTMLElement)) {
		selector = document.querySelector(selector);
	}

	const elem = document.createElement('script');
	elem.setAttribute('src', script);
	if (id) elem.setAttribute('id', id);

	if (IsAfter) {
		// if (
		// 	selector &&
		// 	selector.parentNode &&
		// 	selector.parentNode.querySelectorAll(`[src="${script}"]`).length == 0
		// ) {
		// 	console.log(selector.parentNode.querySelectorAll(`[src="${script}"]`));
		selector.after(elem);
		// }
	} else {
		// if (
		// 	selector &&
		// 	selector.querySelectorAll(`[src="${script}"]`).length == 0
		// ) {
		// 	console.log(selector.querySelectorAll(`[src="${script}"]`));
		selector.appendChild(elem);
		// }
	}

	return elem;
};

export const removeScript = scriptToremove => {
	let allsuspects = document.getElementsByTagName('script');
	for (let i = allsuspects.length; i >= 0; i--) {
		if (
			allsuspects[i] &&
			allsuspects[i].getAttribute('src') !== null &&
			allsuspects[i].getAttribute('src').indexOf(`${scriptToremove}`) !== -1
		) {
			allsuspects[i].parentNode.removeChild(allsuspects[i]);
		}
	}
};

export const appendToSection = (src, section, id = null, after = false) => {
	return new Promise((resolve, reject) => {
		try {
			// console.log(`Script '${src}' Loaded successfuly`);
			const elem = appendScript(src, section, id, after);
			elem.onload = () => {
				resolve(elem);
			};
		} catch (error) {
			console.log(`error loading the script in section ${section}`, error);
			reject(error);
		}
	});
};

export const loadScriptsAsync = section => {
	if (section.scripts && section.scripts.length > 0) {
		document.querySelector(section.id).innerHTML = '';
		let latestElement = appendToSection(section.scripts[0], section.id).then(
			res => {
				const children = [...section.scripts];
				children.shift();
				children.reverse();
				children.map(src => {
					latestElement = appendToSection(src, res, null, true);
				});
			}
		);
		return latestElement;
	}
};

export const populateAllSctions = () => {
	SCRIPT_SECTIONS.VENDOR_JS.scripts = ['app-assets/js/vendors.min.js'];
	SCRIPT_SECTIONS.THEME_JS.scripts = [
		//'/app-assets/vendors/jquery-validation/jquery.validate.min.js',
		'app-assets/js/plugins.js',
		'app-assets/js/search.js',
		'app-assets/js/custom/custom-script.js',
	];
	// SCRIPT_SECTIONS.PAGE_LEVEL_JS.scripts = [
	// 	'app-assets/vendors/waves/waves.min.js',
	// ];
	return SCRIPT_SECTIONS;
};
export const loadAllSectionsScripts = sections => {
	//let latestSection;
	//Object.keys(sections).map(key => {
	//	document.querySelector(sections[key].id).innerHTML = '';
	//	let itm = sections[key];
	//	if (latestSection) {
	//		latestSection = latestSection.then(res => loadScriptsAsync(itm));
	//	} else {
	//		latestSection = loadScriptsAsync(itm);
	//	}
	//});
	//return latestSection;
};
