import React, { Component } from 'react';

export default class SearchNotFound extends Component {
	render() {
		return (
			<ul className="display-none" id="search-not-found">
				<li className="auto-suggestion">
					<a
						className="collection-item display-flex align-items-center"
						href="/"
					>
						<span className="material-icons">error_outline</span>
						<span className="member-info">No results found.</span>
					</a>
				</li>
			</ul>
		);
	}
}
