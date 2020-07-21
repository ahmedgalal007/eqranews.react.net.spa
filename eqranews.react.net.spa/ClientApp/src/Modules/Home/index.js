import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
	render() {
		return (
			<div className="section">
				<h1>Home</h1>
				<Link to="/about">About</Link>
				<div className="card">
					<div className="card-content">
						<p className="caption mb-0">
							Sample blank page for getting start!! Created and designed by
							Google, Material Design is a design language that combines the
							classNameic principles of successful design along with innovation
							and technology.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
