import '../../../vendors/select2/select2.min.css';
import '../../../vendors/select2/select2-materialize.css';
import React, { Component } from 'react';
import {
	requestCreateCrawlStepper,
	requestUpdateCrawlStepper,
} from '../Actions/CrawlStepper';
import {
	requestFetchCrawlStepByStepper,
	requestDeleteCrawlStep,
} from '../Actions/CrawlStep';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import { Link } from 'react-router-dom';
import { DTable } from '../../_shared/components/DTable';
import FormUtils from '../../_shared/lib/FormUtils';
import CrawlStep from './CrawlStep';

class CrawlStepper extends Component {
	constructor(props) {
		super(props);

		const {
			match: { params },
		} = this.props;
		console.log('Stepper Params:', params);
		this.props.updateNavigationState({
			...this.props.navigationState,
			crawlStepperId: params.id,
		});
		this.columns = [
			{ title: 'ID', name: 'id' },
			{ title: 'URL', name: 'url' },
			{ title: 'EDIT', defaultContent: '' },
			{ title: 'DELETE', defaultContent: '' },
		];
		this.columnDefs = [
			{ targets: [2, 3], orderable: false },
			{
				targets: 2,
				createdCell: FormUtils.createEditButton(
					'/crawl/step/',
					this.props.history,
					this.props.navigationState
				),
			},
			{
				targets: 3,
				createdCell: FormUtils.createDeleteButton(this.props.DeleteCrawlStep),
			},
		];
		// if (params.id) initialFieldValues.id = params.id;
		this.initialFieldValues = this.initialFieldValues(
			params?.id || 0,
			this.props.location.state.crawlSourceId
		);
		this.state = { ...this.initialFieldValues, Errors: {} };
	}

	//validate({fullname: 'jenny'})
	initialFieldValues = (id = 0, crawlSourceId) => {
		console.log('crawlSourceId:', crawlSourceId);
		let result = {
			id: id,
			name: '',
			enabled: true,
			recuringTime: '03',
			crawlSourceId: crawlSourceId,
			crawlSteps: [],
		};

		if (id > 0) {
			const record = this.props.data.filter(x => x.id == id)[0];
			if (record) {
				console.log('Initialized Record:', record);
				result = record;
			}
		}
		return result;
	};

	handeCkeckboxChange = e => {
		console.log('Checked Box Clicked!!  ', e.target.type);
		let { value, checked } = e.target;
		if (e.target.type == 'checkbox') {
			value = checked ? true : false;
			this.switch.setAttribute('value', value ? 'true' : 'false');
			this.switch.value = value ? 'true' : 'false';
			const fieldValue = { [this.switch.name]: value };
			//this.setState({ Values: { ...this.props.Values, ...fieldValue } });
			this.setState(fieldValue);
			this.validate(fieldValue);
		}
	};

	handelInputChange = function (e) {
		let { name, value, checked } = e.target;
		console.log('CHECKBOX:', e.target);

		console.log(e.target);
		console.log('Indeterminate', e.target['indeterminate']);

		const fieldValue = { [name]: value };
		//this.setState({ Values: { ...this.props.Values, ...fieldValue } });
		this.setState(fieldValue);
		this.validate(fieldValue);
		console.log(fieldValue);
	}.bind(this);

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
		console.log(e.target);
		if (this.validate()) {
			const formData = new FormData(e.target);
			for (var value of formData.values()) {
				value = value == 'on' ? true : value;
				value = value == 'off' ? false : value;
			}

			if (formData.get('id') == 0) {
				this.props.createCrawlStepper(formData);
			} else {
				alert('update Form');
				this.props.updateCrawlStepper(formData.get('id'), formData);
			}
		}
	};

	componentWillMount = () => {
		this.switch = React.createRef();
		// this.props.FetchCrawlStepperBySource(this.state.crawlSourceId);
		console.log('CRAWl STEPPER PROPS', this.props);

		const scripts = AppUtilities.populateAllSctions();
		scripts.PAGE_VENDOR_JS.scripts.push(
			'app-assets/vendors/formatter/jquery.formatter.min.js'
		);
		// AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		console.log(
			'fetching crawl steps by staepper ID:',
			this.initialFieldValues.id
		);
		this.props.FetchCrawlStepByStepper(this.initialFieldValues.id);

		if (window.jQuery) {
			const $ = window.jQuery;
			$(document).ready(() => {});
		}
		// });
	};

	componentDidMount = () => {
		// if (params.id) initialFieldValues.id = params.id;

		if (window.jQuery && window.M) {
			const $ = window.jQuery;
			$('#recuringTime').formatter({
				pattern: '{{99}}:{{99}}',
			});
		} else if (window.M) {
			document.addEventListener('DOMContentLoaded', function () {
				// var elems = document.querySelectorAll('select');
				// var instances = window.M.FormSelect.init(elems, {});
			});
		}
	};

	render() {
		const {
			id,
			name,
			enabled,
			recuringTime,
			crawlSourceId,
			crawlSteps,
		} = this.state;
		const errors = this.state.Errors;
		console.log('Steps:', this.props);
		return (
			<div className="row">
				{console.log(this.props)}
				<div className="col s12">
					<div id="validations" className="card card-tabs">
						<div className="card-content">
							<div className="card-title">
								<div className="row">
									<div className="col s12 m6 l10">
										<h4 className="card-title">Crawl Stepper</h4>
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
										<div className="input-field col s12">
											<input
												className="validate"
												id="id"
												name="id"
												type="hidden"
												value={id}
											></input>
										</div>
										<div className="input-field col s12">
											<label htmlFor="name">Name*</label>
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
											<div className="switch">
												<label htmlFor="Ckeck01">
													<input
														id="Ckeck01"
														type="checkbox"
														onChange={this.handeCkeckboxChange}
														checked={enabled}
													/>
													<span className="lever"></span>
													Enabled
												</label>
												<input
													id="enabled"
													ref={el => (this.switch = el)}
													name="enabled"
													type="hidden"
													value={enabled ? 'true' : 'false'}
												></input>
											</div>
											<input
												placeholder="00:00"
												id="recuringTime"
												name="recuringTime"
												type="text"
												enabled={this.switch.value == 'true' ? 'true' : 'false'}
												onChange={this.handelInputChange}
												value={recuringTime}
											/>
										</div>
										<div className="input-field col s12">
											<input
												className="validate"
												id="crawlSourceId"
												name="crawlSourceId"
												type="hidden"
												value={crawlSourceId}
											></input>
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

				<div className="col s12">
					<div id="validations" className="card card-tabs">
						<div className="card-content">
							<div className="card-title">
								<div className="row">
									<div className="col s12 m6 l10">
										<h4 className="card-title">Crawl Steps</h4>
									</div>
								</div>
							</div>
							<div id="Crawl-Steppers">
								<section className="users-list-wrapper section">
									<div className="users-list-table">
										<Link
											to={{
												pathname: '/crawl/step/',
												state: { crawlStepperId: id },
											}}
											component={CrawlStep}
											className="btn-floating btn-large waves-effect waves-light red"
										>
											<i className="material-icons">add</i>
										</Link>

										<div className="card">
											<div className="card-content">
												<DTable
													data={FormUtils.tableData(
														this.columns,
														this.props.crawlSteps.length > 0
															? this.props.crawlSteps.filter(
																	x => x.crawlStepperId == id
															  )
															: []
													)}
													columns={this.columns}
													formate={this.formate}
													columnDefs={this.columnDefs}
												></DTable>
											</div>
										</div>
									</div>
								</section>
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
		data: state.CrawlSteppers,
		crawlSteps: state.CrawlSteps,
		countries: state.Countries,
		navigationState: state.NavigationState,
	};
};

const mapActionToProps = {
	FetchCrawlStepByStepper: requestFetchCrawlStepByStepper,
	createCrawlStepper: requestCreateCrawlStepper,
	updateCrawlStepper: requestUpdateCrawlStepper,
	DeleteCrawlStep: requestDeleteCrawlStep,
	updateNavigationState: data => ({
		type: 'UPDATE_NAVIGATION_STATE',
		data: data,
	}),
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CrawlStepper));
