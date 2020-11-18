import React, { Component } from 'react';
import {
	requestCreateCrawlItem,
	requestUpdateCrawlItem,
} from '../Actions/CrawlItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as AppUtilities from '../../_shared/lib/AppUtilities';
import BackButton from '../../_shared/components/BackButton';

class CrawlItem extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount = () => {
		const {
			match: { params },
		} = this.props;

		this.initialFieldValues = this.initialFieldValues(
			params?.id || 0,
			this.props.location.state.crawlStepId
		);
		this.state = { ...this.initialFieldValues, Errors: {} };

		this.props.location.state = {
			crawlSourceId: this.props.location.state.crawlSourceId,
			crawlStepperId: this.props.location.state.crawlStepperId,
			crawlStepId: this.state.crawlStepId,
		};
	};
	componentDidMount = () => {
		const scripts = AppUtilities.populateAllSctions();
		// AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		//	this.forceUpdate();
		// });
	};
	initialFieldValues = (id = 0, stepId) => {
		let result = {
			id: id,
			name: '',
			selector: '',
			value: '',
			attr: '',
			crawlStepId: stepId,
		};

		if (id > 0) {
			const record = this.props.crawlItems.filter(x => x.id == id)[0];
			if (record) {
				console.log('Initialized Record:', record);
				result = record;
			}
		}
		return result;
	};

	handelInputChange = e => {
		const { name, value } = e.target;
		const fieldValue = { [name]: value };
		//this.setState({ Values: { ...this.props.Values, ...fieldValue } });
		this.setState(fieldValue);
		this.validate(fieldValue);
		console.log(fieldValue);
	};

	validate = (fieldValues = this.state) => {
		console.log('fieldValues:', fieldValues);
		let temp = {};
		if ('name' in fieldValues)
			temp.name = fieldValues.name ? '' : 'This field is required.';

		this.setState({ Errors: { ...temp } });
		if (fieldValues == this.state)
			//[ ...this.state ].filter(x => x !== this.state.Errors)
			return Object.values(temp).every(x => x == '');
	};

	handelSubmit = e => {
		e.preventDefault();
		console.log('Prpos!!!!', this.props);
		if (this.validate()) {
			const formData = new FormData(e.target);

			if (formData.get('id') == 0) {
				this.props.CreateCrawlItem(formData);
			} else {
				alert('update Form');
				this.props.UpdateCrawlItem(formData.get('id'), formData);
			}
		}
	};
	render() {
		const { id, name, selector, value, attr, crawlStepId } = this.state;
		const errors = this.state.Errors;
		console.log('CRAWL ITEM PROPS: ', this.props);
		return (
			<div className="row">
				{console.log(this.props)}
				<div className="col s12">
					<div style={{ float: 'left' }}>
						<BackButton
							link={'/crawl/step/' + crawlStepId}
							routeState={this.props.location.state}
						></BackButton>
					</div>
					<div id="validations" className="card card-tabs">
						<div className="card-content">
							<div className="card-title">
								<div className="row">
									<div className="col s12 m6 l10">
										<h4 className="card-title">Crawl Item</h4>
									</div>
								</div>
							</div>
							<div id="view-validations">
								<form
									className="formValidate"
									id="formValidate"
									method="post"
									onSubmit={this.handelSubmit}
								>
									<div className="row">
										<input
											className="validate"
											id="id"
											name="id"
											type="hidden"
											value={id}
										></input>
										<input
											id="crawlStepId"
											name="crawlStepId"
											type="hidden"
											value={crawlStepId}
										></input>
										<div className="input-field col s12">
											<label htmlFor="name">NAME *</label>
											<input
												className="validate"
												id="name"
												name="name"
												type="text"
												data-error=".errorTxt1"
												onChange={this.handelInputChange}
												value={name}
												required
												{...(errors.name && {
													error: 'true',
													'data-pattern-error': errors.name,
												})}
											></input>
											<small className="errorTxt1"></small>
										</div>
										<div className="input-field col s12">
											<label htmlFor="selector">SELECTOR *</label>
											<input
												dir="ltr"
												className="validate"
												id="selector"
												name="selector"
												type="text"
												data-error=".errorTxt2"
												onChange={this.handelInputChange}
												value={selector}
												required
												{...(errors.selector && {
													error: 'true',
													'data-pattern-error': errors.selector,
												})}
											></input>
											<small className="errorTxt2"></small>
										</div>
										<div className="input-field col s12">
											<label htmlFor="value">VALUE *</label>
											<input
												dir="ltr"
												className="validate"
												id="value"
												name="value"
												type="text"
												data-error=".errorTxt2"
												onChange={this.handelInputChange}
												value={value}
												{...(errors.value && {
													error: 'true',
													'data-pattern-error': errors.value,
												})}
											></input>
											<small className="errorTxt2"></small>
										</div>
										<div className="input-field col s12">
											<label htmlFor="attr">ATTRIBUTE *</label>
											<input
												dir="ltr"
												className="validate"
												id="attr"
												name="attr"
												type="text"
												data-error=".errorTxt2"
												onChange={this.handelInputChange}
												value={attr}
												{...(errors.attr && {
													error: 'true',
													'data-pattern-error': errors.attr,
												})}
											></input>
											<small className="errorTxt2"></small>
										</div>

										<div className="input-field col s12">
											<button
												className="btn waves-effect waves-light right submit"
												type="submit"
												name="action"
											>
												Submit
												<i className="material-icons right">send</i>
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		crawlsteps: state.CrawlSteps,
		crawlItems: state.CrawlItems,
	};
};

const mapActionToProps = {
	CreateCrawlItem: requestCreateCrawlItem,
	UpdateCrawlItem: requestUpdateCrawlItem,
	updateNavigationState: data => ({
		type: 'UPDATE_NAVIGATION_STATE',
		data: data,
	}),
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CrawlItem));
