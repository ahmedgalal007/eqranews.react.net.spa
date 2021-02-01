import '../../../vendors/select2/select2.min.css';
import '../../../vendors/select2/select2-materialize.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	requestCreateCrawlStepper,
	requestUpdateCrawlStepper,
} from '../Actions/CrawlStepper';
import {
	requestFetchCrawlStepByStepper,
	requestDeleteCrawlStep,
} from '../Actions/CrawlStep';
import { requestFetchCrawlItemByStep } from '../Actions/CrawlItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import { Link } from 'react-router-dom';
import { DTable } from '../../_shared/components/DTable';
import FormUtils from '../../_shared/lib/FormUtils';
import CrawlStep from './CrawlStep';
import BackButton from '../../_shared/components/BackButton';

class CrawlStepper extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		const {
			match: { params },
		} = this.props;

		this.props.FetchCrawlStepByStepper(params?.id || 0);
		this.crawlSourceId = this.props.location.state.crawlSourceId;
		console.log('this.crawlSourceId', this.props.navigationState.crawlSourceId);
		console.log('location.state', this.props.location.state.crawlSourceId);

		this.initialFieldValues = this.initialFieldValues(
			params?.id || 0,
			this.props.location.state.crawlSourceId
		);
		this.state = { ...this.initialFieldValues, Errors: {} };
		this.props.location.state = {
			crawlStepperId: params?.id || 0,
			crawlSourceId: this.props.location.state.crawlSourceId,
		};

		this.Mount();

		this.columns = [
			{ title: 'ID', name: 'id' },
			{ title: 'Name', name: 'name' },
			{ title: 'URL', name: 'url' },
			{ title: 'EDIT', defaultContent: '' },
			{ title: 'DELETE', defaultContent: '' },
		];
		this.columnDefs = [
			{ targets: [3, 4], orderable: false },
			{
				targets: 3,
				createdCell: (td, cellData, rowData, row, col) => {
					const lnkSTr = '/crawl/step/' + rowData[0];
					console.log('this.props.location.state', this.props.location.state);
					// this.props.updateNavigationState({
					// 	...this.props.navigationState,
					// 	crawlStepperId: this.state.id,
					// });
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer', color: 'green' }}
							onClick={() => {
								requestFetchCrawlItemByStep(rowData[0]);
								this.props.history.push({
									pathname: lnkSTr,
									state: this.props.location.state,
								});
							}}
						>
							<i className="material-icons">edit</i>
						</a>,
						td
					);
				},
			},
			{
				targets: 4,
				createdCell: FormUtils.createDeleteButton(this.props.DeleteCrawlStep),
			},
		];
	}

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

	//validate({fullname: 'jenny'})
	initialFieldValues = (id = 0, crawlSourceId) => {
		console.log('crawlSourceId:', crawlSourceId);
		let result = {
			id: id,
			name: '',
			enabled: true,
			inHome: false,
			inTicker: false,
			inMenu: false,
			inMoreMenu: false,
			inSlider: false,
			recuringTime: '00:03',
			crawlSourceId: crawlSourceId,
			categoryId: 1,
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

	handeCkeckboxChange = (e, elem) => {
		console.log('Checked Box Clicked!!  ', e.target.type);
		let { value, checked } = e.target;
		if (e.target.type == 'checkbox') {
			value = checked ? true : false;
			elem.setAttribute('value', value ? 'true' : 'false');
			elem.value = value ? 'true' : 'false';
			const fieldValue = { [elem.name]: value };
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

	handelSubmit = async e => {
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
				await this.props.updateCrawlStepper(formData.get('id'), formData);
			}
		}
	};

	Mount = () => {
		this.EnabledSwitch = React.createRef();
		this.InHomeSwitch = React.createRef();
		this.InTickerSwitch = React.createRef();
		this.InSliderSwitch = React.createRef();
		this.InMenuSwitch = React.createRef();
		this.InMoreMenuSwitch = React.createRef();

		// // this.props.FetchCrawlStepperBySource(this.state.crawlSourceId);
		// console.log('CRAWl STEPPER PROPS', this.props);

		// const scripts = AppUtilities.populateAllSctions();
		// scripts.PAGE_VENDOR_JS.scripts.push(
		// 	'app-assets/vendors/formatter/jquery.formatter.min.js'
		// );
		// // AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		// console.log(
		// 	'fetching crawl steps by staepper ID:',
		// 	this.initialFieldValues.id
		// );

		if (window.jQuery) {
			const $ = window.jQuery;
			$(document).ready(() => {
				if (window.M) window.M.updateTextFields();
				for (let i = 0; i < 3; i++) {
					if ($().select2) {
						$('#categoryId')
							.select2({
								dropdownAutoWidth: true,
								placeholder: 'Select Type',
								allowClear: true,
								width: '100%',
								dir: 'rtl',
								data: [
									{
										id: '',
										text: 'Select Category',
										selected: this.state.categoryId > 0 ? false : true,
									},
									...$.map(this.props.categories, obj => {
										obj.id = obj.id || obj.pk; // replace pk with your identifier
										obj.text = obj.text || obj.name;
										obj.selected = obj.id == this.state.categoryId;
										return obj;
									}),
								],
							})
							.on('select2:change', this.handelInputChange);
						break;
					} else {
						this.forceUpdate();
					}
				}
				// Load Select2 for parent
			});
		}
		// });
	};

	render() {
		const {
			id,
			name,
			enabled, inHome, inSlider, inTicker, inMenu, inMoreMenu,
			
			recuringTime,
			crawlSourceId,
			categoryId,
			crawlSteps,
		} = this.state;
		const errors = this.state.Errors;
		console.log('render this.crawlSourceId:', this.crawlSourceId);
		return (
			<div className="row">
				{console.log(this.props)}
				<div className="col s12">
					<div style={{ float: 'left' }}>
						<BackButton
							link={'/crawl/source/' + this.props.location.state.crawlSourceId}
							routeState={this.props.location.state}
						></BackButton>
					</div>
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
												<label htmlFor="CkeckEnabled">
													<input
														id="CkeckEnabled"
														type="checkbox"
														onChange={(e) => this.handeCkeckboxChange(e, this.EnabledSwitch)}
														checked={enabled}
													/>
													<span className="lever"></span>
													Enabled
												</label>
												<input
													id="enabled"
													ref={el => (this.EnabledSwitch = el)}
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
												enabled={this.EnabledSwitch.value == 'true' ? 'true' : 'false'}
												onChange={this.handelInputChange}
												value={recuringTime}
											/>
										</div>
										<div className="input-field col l4 m6 s12">
											<div className="switch">
												<label htmlFor="CkeckInHome">
													<input
														id="CkeckInHome"
														type="checkbox"
														onChange={(e) => this.handeCkeckboxChange(e, this.InHomeSwitch)}
														checked={inHome}
													/>
													<span className="lever"></span>
													In Home
												</label>
												<input
													id="inHome"
													ref={el => (this.InHomeSwitch = el)}
													name="inHome"
													type="hidden"
													value={inHome ? 'true' : 'false'}
												></input>
											</div>
										</div>
										<div className="input-field col l4 m6 s12">
											<div className="switch">
												<label htmlFor="CkeckInTicker">
													<input
														id="CkeckInTicker"
														type="checkbox"
														onChange={(e) => this.handeCkeckboxChange(e, this.InTickerSwitch)}
														checked={inTicker}
													/>
													<span className="lever"></span>
													In Ticker
												</label>
												<input
													id="inTicker"
													ref={el => (this.InTickerSwitch = el)}
													name="inTicker"
													type="hidden"
													value={inTicker ? 'true' : 'false'}
												></input>
											</div>
										</div>
										<div className="input-field col l4 m6 s12">
											<div className="switch">
												<label htmlFor="CkeckInSlider">
													<input
														id="CkeckInSlider"
														type="checkbox"
														onChange={(e) => this.handeCkeckboxChange(e, this.InSliderSwitch)}
														checked={inSlider}
													/>
													<span className="lever"></span>
													In Slider
												</label>
												<input
													id="inSlider"
													ref={el => (this.InSliderSwitch = el)}
													name="inSlider"
													type="hidden"
													value={inSlider ? 'true' : 'false'}
												></input>
											</div>
										</div>
										<div className="input-field col l4 m6 s12">
											<div className="switch">
												<label htmlFor="CkeckInMenu">
													<input
														id="CkeckInMenu"
														type="checkbox"
														onChange={(e) => this.handeCkeckboxChange(e, this.InMenuSwitch)}
														checked={inMenu}
													/>
													<span className="lever"></span>
													In Menu
												</label>
												<input
													id="inMenu"
													ref={el => (this.InMenuSwitch = el)}
													name="inMenu"
													type="hidden"
													value={inMenu ? 'true' : 'false'}
												></input>
											</div>
										</div>
										<div className="input-field col l4 m6 s12">
											<div className="switch">
												<label htmlFor="CkeckInMoreMenu">
													<input
														id="CkeckInMoreMenu"
														type="checkbox"
														onChange={(e) => this.handeCkeckboxChange(e, this.InMoreMenuSwitch)}
														checked={inMoreMenu}
													/>
													<span className="lever"></span>
													In More Menu
												</label>
												<input
													id="inMoreMenu"
													ref={el => (this.InMoreMenuSwitch = el)}
													name="inMoreMenu"
													type="hidden"
													value={inMoreMenu ? 'true' : 'false'}
												></input>
											</div>
										</div>
										<div className="input-field col s12">
											<label
												htmlFor="categoryId"
												style={{
													position: 'absolute',
													top: '-14px',
													fontSize: '0.8rem',
												}}
											>
												Category *
											</label>
											<select
												className="validate select2-data-array browser-default"
												id="categoryId"
												type="text"
												name="categoryId"
												data-error=".errorTxt7"
												onChange={this.handelInputChange}
												value={categoryId}
											></select>
											<small className="errorTxt7"></small>
										</div>
										<div className="input-field col s12">
											<input
												className="validate"
												id="crawlSourceId"
												name="crawlSourceId"
												type="hidden"
												value={this.crawlSourceId}
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
		categories: state.Categories,
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
