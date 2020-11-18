import '../../../vendors/select2/select2.min.css';
import '../../../vendors/select2/select2-materialize.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
	requestCreateCrawlStep,
	requestUpdateCrawlStep,
} from '../Actions/CrawlStep';
import {
	requestFetchCrawlItemByStep,
	requestFetchAllCrawlItems,
	requestDeleteCrawlItem,
} from '../Actions/CrawlItem';
import { requestFetchAllCrawlStepTypes } from '../../Settings/Actions/CrawlStepType';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import MaterDetails from '../../_shared/components/MaterDetails';
import { Link } from 'react-router-dom';
import { DTable } from '../../_shared/components/DTable';
import FormUtils from '../../_shared/lib/FormUtils';
import CrawlItem from './CrawlItem';
import BackButton from '../../_shared/components/BackButton';

class CrawlStep extends Component {
	constructor(props) {
		super(props);
		this.props.FetchAllCrawlStepTypes();
		this.state = { crawlStepperId: 0, crawlStepTypeId: 0 };
	}

	//validate({fullname: 'jenny'})
	initialFieldValues = (id = 0, parentId) => {
		let result = {
			id: id,
			name: '',
			url: '',
			selector: '',
			crawlStepTypeId: 0,
			crawlStepperId: parentId,
			crawlItems: [],
		};

		if (id > 0) {
			const record = this.props.data.filter(x => x.id == id)[0];
			// if (record) {
			console.log('Initialized Record:', record);
			result = record;
			// }
		}
		return result;
	};

	componentWillMount = () => {
		const {
			match: { params },
		} = this.props;

		// if (params.id && params.id > 0)
		this.props.location.state = {
			crawlStepperId: this.props.location.state.crawlStepperId,
			crawlSourceId: this.props.location.state.crawlSourceId,
			crawlStepId: Number.parseInt(params.id, 10),
		};

		const initialFieldValues = this.initialFieldValues(
			params?.id || 0,
			this.props.location.state.crawlStepperId
		);

		this.setState({ ...initialFieldValues, Errors: {} });

		console.log('this.props.location.state', this.props.location.state);
		this.columns = [
			{ title: 'ID', name: 'id' },
			{ title: 'NAME', name: 'name' },
			{ title: 'EDIT', defaultContent: '' },
			{ title: 'DELETE', defaultContent: '' },
		];
		this.columnDefs = [
			{ targets: [2, 3], orderable: false },
			{
				targets: 2,
				createdCell: FormUtils.createEditButton(
					'/crawl/item/',
					this.props.history,
					this.props.location.state
				),
			},
			{
				targets: 3,
				createdCell: FormUtils.createDeleteButton(this.props.DeleteCrawlItem),
			},
		];

		// this.stepperId = 0;
		// if (this.props.location.state) {
		// 	if (
		// 		this.props.location.state.crawlStepperId &&
		// 		this.props.location.state.crawlStepperId > 0
		// 	) {
		// 		this.stepperId = this.props.location.state.crawlStepperId;
		// 	}
		// }

		console.log('CRAWl STEP ITEMS', this.props.crawlItems);
		this.props.FetchCrawlItemByStep(initialFieldValues.id);

		// const scripts = AppUtilities.populateAllSctions();
		// scripts.PAGE_VENDOR_JS.scripts.push(
		// 	'app-assets/vendors/select2/select2.full.min.js'
		// );

		// AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		if (window.jQuery) {
			const $ = window.jQuery;
			$(document).ready(() => {
				for (let i = 0; i < 3; i++) {
					if ($().select2) {
						$('#crawlStepTypeId')
							.select2({
								dropdownAutoWidth: true,
								placeholder: 'Select Type',
								allowClear: true,
								width: '100%',
								dir: 'rtl',
								data: [
									{
										id: '',
										text: 'Select Step Type',
										selected: this.state.crawlStepTypeId > 0 ? false : true,
									},
									...$.map(this.props.crawlStepTypes, obj => {
										obj.id = obj.id || obj.pk; // replace pk with your identifier
										obj.text = obj.text || obj.name;
										obj.selected = obj.id == this.state.crawlStepTypeId;
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
		// this.props.FetchCrawlItemByStep(this.state.id);
	};

	componentDidUpdate = () => {
		// this.props.FetchCrawlItemByStep(this.state.id);
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
		if ('url' in fieldValues)
			temp.url = fieldValues.url ? '' : 'This field is required.';
		if ('selector' in fieldValues)
			temp.selector = fieldValues.selector ? '' : 'This field is required.';

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

			if (formData.get('id') == 0) {
				this.props.createCrawlStep(formData);
				this.props.history.goBack();
			} else {
				alert('update Form');
				this.props.updateCrawlStep(formData.get('id'), formData);
				this.props.history.goBack();
			}
		}
	};

	render() {
		const {
			id,
			name,
			url,
			selector,
			crawlStepTypeId,
			crawlStepperId,
			crawlItems,
		} = this.state;
		const errors = this.state.Errors;

		console.log('STEP_State:', this.state);
		return (
			<div className="row">
				{console.log(this.props)}
				<div className="col s12">
					<div style={{ float: 'left' }}>
						<BackButton
							link={'/crawl/stepper/' + crawlStepperId}
							routeState={this.props.location.state}
						></BackButton>
					</div>
					<div id="validations" className="card card-tabs">
						<div className="card-content">
							<div className="card-title">
								<div className="row">
									<div className="col s12 m6 l10">
										<h4 className="card-title">Crawl Step</h4>
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
											<label htmlFor="name">Name *</label>
											<input
												dir="rtl"
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
											<label htmlFor="name">URL *</label>
											<input
												dir="ltr"
												className="validate"
												id="url"
												name="url"
												type="text"
												data-error=".errorTxt1"
												onChange={this.handelInputChange}
												value={url}
												required
												{...(errors.url && {
													error: 'true',
													'data-pattern-error': errors.Url,
												})}
											></input>
											<small className="errorTxt1"></small>
										</div>
										<div className="input-field col s12">
											<label htmlFor="name">SELECTOR *</label>
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
											<input
												className="validate"
												id="crawlStepperId"
												name="crawlStepperId"
												type="hidden"
												value={crawlStepperId}
											></input>
										</div>
										<div className="input-field col s12">
											<label
												htmlFor="crawlStepTypeId"
												style={{
													position: 'absolute',
													top: '-14px',
													fontSize: '0.8rem',
												}}
											>
												Crawl Step Type *
											</label>
											<select
												className="validate select2-data-array browser-default"
												id="crawlStepTypeId"
												type="text"
												name="crawlStepTypeId"
												data-error=".errorTxt7"
												onChange={this.handelInputChange}
												value={crawlStepTypeId}
											></select>
											<small className="errorTxt7"></small>
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
										<h4 className="card-title">Crawl Items</h4>
									</div>
								</div>
							</div>
							<div id="Crawl-Steppers">
								<section className="users-list-wrapper section">
									<div className="users-list-table">
										<Link
											to={{
												pathname: '/crawl/item/',
												state: { crawlStepId: id },
											}}
											component={CrawlItem}
											className="btn-floating btn-large waves-effect waves-light red"
										>
											<i className="material-icons">add</i>
										</Link>

										<a className="waves-effect waves-red btn white red-text primary-content">
											<i className="material-icons left">add_to_photos</i> جديد
										</a>
										<div className="card">
											<div className="card-content">
												<DTable
													data={FormUtils.tableData(
														this.columns,
														this.props.crawlItems &&
															this.props.crawlItems.length > 0
															? this.props.crawlItems.filter(
																	x => x.crawlStepId == id
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
				<script src="../../../app-assets/js/scripts/form-file-uploads.js"></script>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.CrawlSteps,
		crawlItems: state.CrawlItems,
		crawlStepTypes: state.CrawlStepTypes,
		navigationState: state.NavigationState,
	};
};

const mapActionToProps = {
	FetchAllCrawlStepTypes: requestFetchAllCrawlStepTypes,
	FetchCrawlItemByStep: requestFetchCrawlItemByStep,
	DeleteCrawlItem: requestDeleteCrawlItem,
	createCrawlStep: requestCreateCrawlStep,
	updateCrawlStep: requestUpdateCrawlStep,
	updateNavigationState: data => ({
		type: 'UPDATE_NAVIGATION_STATE',
		data: data,
	}),
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CrawlStep));
