import React, { Component } from 'react';

export default class PageSearchTitle extends Component {
	render() {
		return (
			<ul className="display-none" id="page-search-title">
				<li className="auto-suggestion-title">
					<a className="collection-item" href="/">
						<h6 className="search-title">PAGES</h6>
					</a>
				</li>
			</ul>
		);
	}
}
