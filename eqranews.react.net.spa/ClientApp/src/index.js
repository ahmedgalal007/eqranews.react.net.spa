// import 'bootstrap/dist/css/bootstrap.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware, { delay } from 'redux-saga';

import App from './App';
import reducers from './Reducers';
import rootSaga from './sagas';
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
	reducers,
	compose(
		applyMiddleware(sagaMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

// then run the saga
sagaMiddleware.run(rootSaga);

//import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
//%PUBLIC_URL%
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter basename="/">
			{
				//<Route path="/" render={props => <App />} />
				// <App />
			}
			<Route path="/" component={withRouter(App)} />
		</BrowserRouter>
	</Provider>,
	rootElement,
	() => {
		// document.body.innerHTML = document.querySelector('#root').innerHTML;
		document.querySelector('#root').style.height = '100%';
		const appendScript = script => {
			const elem = document.createElement('script');
			elem.setAttribute('src', script);
			document.body.append(elem);
			return elem;
		};
		appendScript('app-assets/js/vendors.min.js').onload = () => {
			appendScript('app-assets/js/plugins.js').onload = () => {
				appendScript('app-assets/js/search.js');
				appendScript('app-assets/js/custom/custom-script.js');
				document.querySelector('#reactloader').remove();
			};
		};
	}
);

// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();

// function* reactCallback() {
// 	const appendScriptY = script => {
// 		const elem = document.createElement('script');
// 		elem.setAttribute('src', script);
// 		document.body.append(elem);
// 		return elem;
// 	};
// 	yield (document.querySelector('#root').style.height = '100%');
// 	yield appendScriptY('app-assets/js/vendors.min.js');
// 	yield appendScriptY('app-assets/js/plugins.js');
// 	yield appendScriptY('app-assets/js/search.js');
// 	yield appendScriptY('app-assets/js/custom/custom-script.js');
// 	yield document.querySelector('#reactloader').remove();
// }
