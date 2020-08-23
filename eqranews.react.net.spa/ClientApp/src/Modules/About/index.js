import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class About extends Component {
	componentDidMount = () => {
		this.state = {};
	};
	render() {
		return (
			<div className="about">
				<h1>About</h1>
				<Link to="/">Home</Link>
			</div>
		);
	}
}
