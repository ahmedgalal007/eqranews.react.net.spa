import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestFetchAllCountries } from '../Settings/Actions/Country';
import { requestFetchAllCrawlStepTypes } from '../Settings/Actions/CrawlStepType';
import { requestFetchAllCategories } from '../Settings/Actions/Category';
class Home extends Component {
	constructor(props) {
		super(props);
		this.props.FetchAllCategories();
		this.props.FetchAllCountries();
		this.props.FetchAllCrawlStepTypes();
	}
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

const mapStateToProps = state => {
	return { ...state };
};

const mapActionToProps = {
	FetchAllCategories: requestFetchAllCategories,
	FetchAllCountries: requestFetchAllCountries,
	FetchAllCrawlStepTypes: requestFetchAllCrawlStepTypes,
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(Home));
