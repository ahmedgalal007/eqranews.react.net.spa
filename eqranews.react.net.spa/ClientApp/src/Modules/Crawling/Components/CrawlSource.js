import '../../../vendors/select2/select2.min.css';
import '../../../vendors/select2/select2-materialize.css';
// import '../../../app-assets/js/scripts/form-validation.js';
import '../../../vendors/dropify/css/dropify.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	requestCreateCrawlSource,
	requestUpdateCrawlSource,
	requestFetchCrawlSourceById,
	requestFetchAllCrawlSources,
} from '../Actions/CrawlSource';
import {
	requestFetchCrawlStepperBySource,
	requestDeleteCrawlStepper,
} from '../Actions/CrawlStepper';
import BackButton from '../../_shared/components/BackButton';
// import useForm from '../../_shared/components/useForm';
// import $ from 'jquery';
//import M from 'materialize-css';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as AppUtilities from '../../_shared/lib/AppUtilities';

import { DTable } from '../../_shared/components/DTable';

import FormUtils from '../../_shared/lib/FormUtils';
import { CrawlStepper } from './CrawlStepper';

// var $ = require('jquery');

class CrawlSource extends React.Component {
	constructor(props) {
		super(props);

		const {
			match: { params },
		} = this.props;

		const initialFieldValues = this.initialFieldValues(params.id);
		this.state = { ...initialFieldValues, Errors: {} };
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
				// createdCell: FormUtils.createEditButton(
				// 	'/crawl/stepper/' + this.state.id + '/',
				// 	this.props.history
				// ),
				// createdCell: FormUtils.createEditLink('/crawl/stepper/', {
				// 	source: this.state.id,
				// }),
				createdCell: (td, cellData, rowData, row, col) => {
					const lnkSTr = '/crawl/stepper/' + rowData[0];
					this.props.updateNavigationState({
						...this.props.navigationState,
						crawlSourceId: this.state.id,
					});
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer', color: 'green' }}
							onClick={() => {
								// this.props.location.state = {
								// 	crawlSourceId: this.state.id,
								// };
								this.props.history.push({
									pathname: lnkSTr,
									state: this.props.navigationState,
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
				targets: 3,
				createdCell: FormUtils.createDeleteButton(
					this.props.DeleteCrawlStepper
				),
			},
		];
		console.log('Values: ', this.state);
	}

	//validate({fullname: 'jenny'})
	initialFieldValues = (id = 0) => {
		let result = {
			id: id,
			name: '',
			domainURL: '',
			countryId: '',
			logo: '',
			crawlStepper: [],
		};

		if (id > 0) {
			console.log('Initialized Data:', this.props.data);
			const record = this.props.data.filter(x => x.id == id)[0];
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
		if ('domainURL' in fieldValues)
			temp.domainURL = fieldValues.domainURL ? '' : 'This field is required.';
		if ('countryId' in fieldValues)
			temp.countryId = fieldValues.countryId
				? ''
				: 'You must select a country.';
		//temp.Email = (/^$|.+@.+..+/).test(fieldValues.Email)? "" : "Email is not valid"
		this.setState({ Errors: { ...temp } });
		if (fieldValues == this.state)
			//[ ...this.state ].filter(x => x !== this.state.Errors)
			return Object.values(temp).every(x => x == '');
	};
	handelSubmit = e => {
		e.preventDefault();

		console.log('Post-Data');
		// if (this.validate()) {
		const formData = new FormData(e.target);

		console.log('Form-Data', formData);
		if (formData.get('id') == 0) {
			this.props.createCrawlSources(formData);
		} else {
			this.props.updateCrawlSources(formData.get('id'), formData);
		}
		// $('.dropify-clear').click();
		e.target.files = null;
		// }
	};

	setFile = e => {
		// this.setState({ Logo: e.target.files[0] });
		console.log('target from setFile', e.target);
		this.forceUpdate();
		e.target.value = '';
	};

	componentWillMount = () => {
		// const scripts = AppUtilities.populateAllSctions();
		// scripts.PAGE_VENDOR_JS.scripts.push(
		// 	'app-assets/vendors/select2/select2.full.min.js'
		// );
		// scripts.PAGE_VENDOR_JS.scripts.push(
		// 	'/app-assets/vendors/dropify/js/dropify.js'
		// );

		/////////////////////////////////////////////////////////////////
		// scripts.PAGE_LEVEL_JS.scripts.push(
		// 	'/app-assets/js/scripts/form-file-uploads.js'
		// );
		// AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		// if (this.state.id && !this.state.IsChildrenLoaded) {
		this.props.FetchCrawlStepperBySource(this.state.id);
		// 	this.setState({ IsChildrenLoaded: true });
		// }

		if (window.jQuery) {
			const $ = window.jQuery;
			console.log('SELECT COUNTRIES', this.props.countries);
			$(document).ready(() => {
				if (window.M) window.M.updateTextFields();
				for (let i = 0; i < 3; i++) {
					if ($().select2) {
						$('#countryId').select2({
							dropdownAutoWidth: true,
							placeholder: 'Select Country',
							allowClear: true,
							width: '100%',
							dir: 'rtl',
							data: [
								{
									id: '',
									text: 'Select a Country',
									selected: this.state.countryId > 0 ? false : true,
								},
								...$.map(this.props.countries, obj => {
									obj.id = obj.id || obj.pk; // replace pk with your identifier
									obj.text = obj.text || obj.name;
									obj.selected = obj.id == this.state.countryId;
									return obj;
								}),
							],
						});
						break;
					} else {
						// this.forceUpdate();
					}
				}
				// Load Select2 for parent
			});
		}
		// });
	};

	componentDidUpdate = () => {
		// if (window.jQuery && window.M) {
		// 	const $ = window.jQuery;
		// 	var drEvent = $('.dropify-event');
		// 	drEvent.empty();
		// 	drEvent.dropify({
		// 		defaultFile: this.state.logo,
		// 	});
		// }
	};
	componentDidMount = () => {
		// var dropify = require('../../../vendors/dropify/js/dropify');
		// this.props.FetchAllCrawlSources();
		// if (window.jQuery && window.M) {
		// 	const $ = window.jQuery;
		// 	var drEvent = $('.dropify-event');
		// 	drEvent.empty();
		// 	drEvent.data = null;
		// 	drEvent.dropify({
		// 		defaultFile: this.state.logo,
		// 	});
		// }

		// console.log('CarwlSource-Props', this.props);
		if (window.jQuery && window.M) {
			const $ = window.jQuery;
			//$('.dropify-event').val('');

			// $(document).ready(
			// 	function () {
			//if (window.jQuery) this.loadPageScripts(window.jQuery);
			$('select').formSelect();
			console.log($('select'));
			//this.loadPageScripts($);
			//	}.bind(this)
			//	);
			$(document).ready(function () {
				// Basic
				// $('.dropify').dropify();
				// Used events
				var drEvent = $('.dropify-event').dropify();

				drEvent.on(
					'dropify.beforeClear',
					function (event, element) {
						// eslint-disable-next-line no-restricted-globals
						return confirm(
							'Do you really want to delete "' + element.filename + '" ?'
						);
					},
					this.loadPageScripts
				);

				drEvent.on('dropify.afterClear', function (event, element) {
					alert('File deleted');
				});
			});
		} else {
			if (window.M) {
				// document.addEventListener('DOMContentLoaded', function () {
				// 	var elems = document.querySelectorAll('select');
				// 	var instances = window.M.FormSelect.init(elems, {});
				// });
			}
		}
	};

	render() {
		const { id, name, domainURL, countryId, crawlStepper } = this.state;
		let DLogo = this.state.logo;
		if (this.state.logo == undefined || this.state.logo == '')
			DLogo = '/images/sources/Al_Ahram.png';
		// document.querySelector('.dropify-render img').src = logo;
		// document.querySelector(".dropify-event").setAttribute("data-default-file", DLogo);

		console.log('logo var in render', this.state.logo);
		const errors = this.state.Errors;
		// console.log('Steppers', this.props.crawlSteppers);
		return (
			<div className="row">
				<div className="col s12">
					<div style={{ float: 'left' }}>
						<BackButton link="/crawl/"></BackButton>
					</div>
					<div id="validations" className="card card-tabs">
						<div className="card-content">
							<div className="card-title">
								<div className="row">
									<div className="col s12 m6 l10">
										<h4 className="card-title">Crawl Source</h4>
									</div>
								</div>
							</div>
							<div id="view-validations">
								<form
									encType="multipart/form-data"
									className="formValidate"
									id="formValidate"
									method="post"
									onSubmit={this.handelSubmit}
								>
									<div className="row">
										<div className="col s12 l4">
											<div className="input-field col s12">
												<div className=" section">
													<label className="active" htmlFor="logo">
														Maximum file upload size 512K.
													</label>
												</div>
												<input
													name="logo"
													type="file"
													id="input-file-max-fs"
													className="dropify-event"
													onChange={this.setFile}
													data-max-file-size="512K"
													data-allowed-file-extensions="jpg png jpeg webp"
													data-default-file={DLogo}
												/>
											</div>
										</div>
										<div className="col s12 l8">
											<div className="input-field col s12">
												<input
													className="validate"
													id="id"
													name="id"
													type="hidden"
													value={id}
												/>
											</div>
											<div className="input-field col s12">
												<label className="active" htmlFor="name">
													Name*
												</label>
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
												/>
												<small className="errorTxt1"></small>
											</div>
											<div className="input-field col s12">
												<label className="active" htmlFor="domainURL">
													Domain URL *
												</label>
												<input
													dir="ltr"
													className="validate"
													id="domainURL"
													type="url"
													name="domainURL"
													data-error=".errorTxt5"
													onChange={this.handelInputChange}
													value={domainURL}
													required
												/>
												<small className="errorTxt5"></small>
											</div>
											<div className="input-field col s12">
												<label
													className="active"
													htmlFor="countryId"
													style={{
														position: 'absolute',
														top: '-14px',
														fontSize: '0.8rem',
													}}
												>
													COUNTRY *
												</label>
												<select
													className="validate select2-data-array browser-default"
													id="countryId"
													type="text"
													name="countryId"
													data-error=".errorTxt5"
													onChange={this.handelInputChange}
													value={countryId}
												></select>
												<small className="errorTxt5"></small>
											</div>
										</div>
									</div>
									<div className="row">
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

				{id && id > 0 ? this.renderChildForm() : null}
				{/* <script src="../../../app-assets/js/scripts/form-file-uploads.js"></script> */}
			</div>
		);
	}

	renderChildForm = () => {
		const { id, name, domainURL, countryId, logo, crawlStepper } = this.state;

		return (
			<div className="col s12">
				<div id="validations" className="card card-tabs">
					<div className="card-content">
						<div className="card-title">
							<div className="row">
								<div className="col s12 m6 l10">
									<h4 className="card-title">Crawl Steppers</h4>
								</div>
							</div>
						</div>
						<div id="Crawl-Steppers">
							<section className="users-list-wrapper section">
								<div className="users-list-table">
									<Link
										to={{
											pathname: '/crawl/stepper/',
											state: { id: 0, crawlSourceId: id },
										}}
										params={{ source: id }}
										className="btn-floating btn-large waves-effect waves-light red"
									>
										<i className="material-icons">add</i>
									</Link>

									<a className="waves-effect waves-red btn white red-text primary-content">
										<i class="material-icons left">add_to_photos</i> جديد
									</a>
									<div className="card">
										<div className="card-content">
											<DTable
												data={FormUtils.tableData(
													this.columns,
													this.props.crawlSteppers.length > 0
														? this.props.crawlSteppers.filter(
																x => x.crawlSourceId == id
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
		);
	};

	loadPageScripts = () => {
		if (window.jQuery) {
			const $ = window.jQuery;
			$(document).ready(() => {
				// Basic
				// $('.dropify').dropify();
				// console.log($('.dropify').dropify());
				// Translated
				// $('.dropify-fr').dropify({
				// 	messages: {
				// 		default: 'Glissez-déposez un fichier ici ou cliquez',
				// 		replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
				// 		remove: 'Supprimer',
				// 		error: 'Désolé, le fichier trop volumineux',
				// 	},
				// });

				// Used events
				var drEvent = $('.dropify-event').dropify();

				drEvent.on('dropify.beforeClear', function (event, element) {
					console.log('File Element:', element);
					return window.confirm(
						'Do you really want to delete "' + element.filename + '" ?'
					);
				});

				drEvent.on('dropify.afterClear', function (event, element) {
					console.log('File Element:', element);
					alert(element);
				});
			});
		}
	};
}

const mapStateToProps = state => {
	return {
		data: state.CrawlSources,
		crawlSteppers: state.CrawlSteppers,
		countries: state.Countries,
		navigationState: state.NavigationState,
	};
};

const mapActionToProps = {
	FetchCrawlSourceById: requestFetchCrawlSourceById,
	FetchAllCrawlSources: requestFetchAllCrawlSources,
	createCrawlSources: requestCreateCrawlSource,
	updateCrawlSources: requestUpdateCrawlSource,
	FetchCrawlStepperBySource: requestFetchCrawlStepperBySource,
	DeleteCrawlStepper: requestDeleteCrawlStepper,
	updateNavigationState: data => ({
		type: 'UPDATE_NAVIGATION_STATE',
		data: data,
	}),
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CrawlSource));
