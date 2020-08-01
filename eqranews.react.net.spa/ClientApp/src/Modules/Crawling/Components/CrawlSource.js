import React from 'react';
import * as actions from '../Actions/CrawlSource';
// import useForm from '../../_shared/components/useForm';
// import $ from 'jquery';
//import M from 'materialize-css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import '../../../app-assets/js/scripts/form-validation.js';
import '../../../vendors/dropify/css/dropify.min.css';
import * as AppUtilities from '../../../Modules/_shared/lib/AppUtilities';

// var $ = require('jquery');

class CrawlSource extends React.Component {
	constructor(props) {
		super(props);

		const {
			match: { params },
		} = this.props;

		// if (params.id) initialFieldValues.id = params.id;
		const initialFieldValues = this.initialFieldValues(params.id);
		this.state = { ...initialFieldValues, Errors: {} };
		console.log('Values: ', this.state);
	}

	//validate({fullname: 'jenny'})
	initialFieldValues = (Id = 0) => {
		return {
			Id: Id,
			Name: '',
			DomainURL: '',
			CountryId: '',
			Logo: '',
		};
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
		if ('Name' in fieldValues)
			temp.Name = fieldValues.Name ? '' : 'This field is required.';
		if ('Domain' in fieldValues)
			temp.Domain = fieldValues.Domain ? '' : 'This field is required.';
		if ('CountryId' in fieldValues)
			temp.CountryId = fieldValues.CountryId
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
		if (this.validate()) {
			// window.alert('Validation succeeded.');
			window.alert('inserted.');

			const formData = new FormData();
			//console.log('Form-State', this.state);
			Object.keys(this.state).forEach(key => {
				if (key != 'Errors') formData.append(key, this.state[key]);
			});

			console.log('Form-Data', formData);
			if (formData.id == 0) {
				// this.props.createCrawlSources(formData);
			} else {
				// this.props.updateCrawlSources(formData);
			}
		}
	};

	setFile = e => {
		this.setState({ Logo: e.target.files[0] });
	};

	componentWillMount = () => {
		const scripts = AppUtilities.populateAllSctions();
		scripts.PAGE_VENDOR_JS.scripts.push(
			'/app-assets/vendors/dropify/js/dropify.js'
		);
		scripts.PAGE_LEVEL_JS.scripts.push(
			'/app-assets/js/scripts/form-file-uploads.js'
		);
		AppUtilities.loadAllSectionsScripts(scripts).then(() => {
			this.forceUpdate();
			// this.loadPageScripts();
		});
	};

	componentDidMount = () => {
		// var dropify = require('../../../vendors/dropify/js/dropify');
		console.log('CarwlSource-Props', this.props);
		if (window.jQuery) console.log('jQuery Defined!!');
		if (window.jQuery && window.M) {
			const $ = window.jQuery;
			$(document).ready(
				function () {
					//if (window.jQuery) this.loadPageScripts(window.jQuery);
					$('select').formSelect();
					console.log($('select'));
					//this.loadPageScripts($);
				}.bind(this)
			);
		} else if (window.M) {
			document.addEventListener('DOMContentLoaded', function () {
				var elems = document.querySelectorAll('select');
				var instances = window.M.FormSelect.init(elems, {});
			});
		}
	};

	render() {
		const { Id, Name, DomainURL, CountryId, Logo } = this.state;
		const errors = this.state.Errors;
		console.log('Props', this.state);
		return (
			<div className="row">
				{console.log(this.props)}
				<div className="col s12">
					<div id="validations" className="card card-tabs">
						<div className="card-content">
							<div className="card-title">
								<div className="row">
									<div className="col s12 m6 l10">
										<h4 className="card-title">Crawl Source</h4>
									</div>
									<div className="col s12 m6 l2">
										<ul className="tabs">
											<li className="tab col s6 p-0">
												<a className="active p-0" href="#view-validations">
													View
												</a>
											</li>
											<li className="tab col s6 p-0">
												<a className="p-0" href="#js-validations">
													Tab 2
												</a>
											</li>
										</ul>
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
										<div className="input-field col s12">
											{console.log(this.props)}
											<label htmlFor="id">id:{Id} </label>
										</div>
										<div className="input-field col s12">
											<label htmlFor="Name">Name*</label>
											<input
												className="validate"
												id="Name"
												name="Name"
												type="text"
												data-error=".errorTxt1"
												onChange={this.handelInputChange}
												value={Name}
												required
												{...(errors.Name && {
													error: 'true',
													'data-pattern-error': errors.Name,
												})}
											/>
											<small className="errorTxt1"></small>
										</div>
										<div className="input-field col s12">
											<label htmlFor="Domain">Domain URL *</label>
											<input
												className="validate"
												id="DomainURL"
												type="url"
												name="DomainURL"
												data-error=".errorTxt5"
												onChange={this.handelInputChange}
												value={DomainURL}
												required
											/>
											<small className="errorTxt5"></small>
										</div>
										<div className="col s12">
											<label htmlFor="CountryId">Country *</label>
											<div
												className="input-field "
												{...(errors.CountryId && { error: 'true' })}
											>
												<select
													className="error validate"
													id="CountryId"
													name="CountryId"
													data-error=".errorTxt6"
													onChange={this.handelInputChange}
													value={CountryId}
												>
													<option value="" disabled>
														Choose Country
													</option>
													<option value="1">Egypt</option>
													<option value="2">Saudi Erabia</option>
													<option value="3">Kuwait</option>
												</select>
												<small className="errorTxt6">
													{errors.CountryId && errors.CountryId}
												</small>
											</div>
										</div>
										<div className="input-field col s12">
											<div className=" section">
												<label htmlFor="logo">
													Maximum file upload size 512K.
												</label>
											</div>
											<input
												name="Logo"
												type="file"
												id="input-file-max-fs"
												className="dropify-event"
												data-max-file-size="512K"
												onChange={this.setFile}
											/>
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
				<script src="../../../app-assets/js/scripts/form-file-uploads.js"></script>
			</div>
		);
	}

	loadPageScripts = () => {
		if (window.jQuery) {
			const $ = window.jQuery;
			$(document).ready(() => {
				console.log('$', $);

				// Basic
				$('.dropify').dropify();
				console.log($('.dropify').dropify());
				// Translated
				$('.dropify-fr').dropify({
					messages: {
						default: 'Glissez-déposez un fichier ici ou cliquez',
						replace: 'Glissez-déposez un fichier ou cliquez pour remplacer',
						remove: 'Supprimer',
						error: 'Désolé, le fichier trop volumineux',
					},
				});

				// Used events
				var drEvent = $('.dropify-event').dropify();

				drEvent.on('dropify.beforeClear', function (event, element) {
					// return confirm(
					// 	'Do you really want to delete "' + element.filename + '" ?'
					// );
				});

				drEvent.on('dropify.afterClear', function (event, element) {
					alert('File deleted');
				});
			});
		}
	};
}

const mapStateToProps = state => {
	return {
		crawlSourceList: state.CrawlSources.list,
		// ...oldState,
	};
};

const mapActionToProps = {
	// createCrawlSources: actions.req,
	// updateCrawlSources: actions.UPDATE,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CrawlSource));

// $('select[required]').css({
// 	position: 'absolute',
// 	display: 'inline',
// 	height: 0,
// 	padding: 0,
// 	border: '1px solid rgba(255,255,255,0)',
// 	width: 0
// });

// $("#formValidate").validate({
// 	rules: {
// 		uname: {
// 			required: true,
// 			minlength: 5
// 		},
// 		cemail: {
// 			required: true,
// 			email:true
// 		},
// 		password: {
// 			required: true,
// 			minlength: 5
// 		},
// 		cpassword: {
// 			required: true,
// 			minlength: 5,
// 			equalTo: "#password"
// 		},
// 		curl: {
// 			required: true,
// 			url:true
// 		},
// 		crole:{
// 			required: true,
// 		},
// 		ccomment: {
// 			required: true,
// 			minlength: 15
// 		},
// 		cgender:"required",
// 		cagree:"required",
// 		},
// 		//For custom messages
// 		messages: {
// 		uname:{
// 			required: "Enter a username",
// 			minlength: "Enter at least 5 characters"
// 		},
// 		curl: "Enter your website",
// 		},
// 		errorElement : 'div',
// 		errorPlacement: function(error, element) {
// 			var placement = $(element).data('error');
// 			if (placement) {
// 				$(placement).append(error)
// 			} else {
// 		error.insertAfter(element);
// 		}
// 	}
// });
