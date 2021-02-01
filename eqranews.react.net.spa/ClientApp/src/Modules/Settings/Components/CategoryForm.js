import '../../../vendors/materialize-colorpicker/css/materialize-colorpicker.min.css';
import '../../../vendors/select2/select2.min.css';
import '../../../vendors/select2/select2-materialize.css';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
	requestCreateCategory,
	requestUpdateCategory,
} from '../Actions/Category';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import { withRouter } from 'react-router-dom';

export class CategoryForm extends Component {
	constructor(props) {
		super(props);

		const {
			match: { params },
		} = this.props;

		const initialFieldValues = this.initialFieldValues(params.id);
		this.state = { ...initialFieldValues, Errors: {} };
		console.log('Values: ', this.state);
		this.switch = React.createRef();
	}

	componentDidMount = () => {
		// const scripts = AppUtilities.populateAllSctions();
		// scripts.PAGE_VENDOR_JS.scripts.push(
		// 	'app-assets/vendors/select2/select2.full.min.js'
		// );
		// scripts.PAGE_VENDOR_JS.scripts.push(
		// 	'app-assets/vendors/materialize-colorpicker/js/materialize-colorpicker.min.js'
		// );

		// AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		//this.forceUpdate();

		if (window.jQuery) {
			const $ = window.jQuery;
			$(document).ready(() => {
				for (let i = 0; i < 3; i++) {
					if ($.fn.colorpicker) {
						// Load the colorPicker
						const color = this.state.color ? this.state.color : '#ffffff';
						const colorPicker = $('#color-component').colorpicker({
							component: '.btn',
							format: 'hex',
							color: color,
						});
						colorPicker.colorpicker('setValue', color);
						break;
					} else {
						this.forceUpdate();
					}
				}

				for (let i = 0; i < 3; i++) {
					if ($().select2) {
						$('#parentId').select2({
							dropdownAutoWidth: true,
							placeholder: 'Select Parent Category',
							allowClear: true,
							width: '100%',
							dir: 'rtl',
							data: [
								{
									id: '',
									text: 'Select Parent Category',
									selected: this.state.parentId > 0 ? false : true,
								},
								...$.map(this.props.data, obj => {
									obj.id = obj.id || obj.pk; // replace pk with your identifier
									obj.text = obj.text || obj.name;
									obj.selected = obj.id == this.state.parentId;
									return obj.id !== this.state.id &&
										obj.parentId !== this.state.id
										? obj
										: null;
								}),
							],
						});
						break;
					} else {
						this.forceUpdate();
					}
				}
				// Load Select2 for parent
			});
		}
		//});
	};
	//validate({fullname: 'jenny'})
	initialFieldValues = (id = 0) => {
		let result = {
			id: id,
			name: '',
			color: '',
			default: false,
			isHome: false,
			isTiker: false,
			isMenu: false,
			isSlider: false,
			parentId: '',
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
		this.setState(fieldValue);
		this.validate(fieldValue);
		console.log(fieldValue);
	};

	handelCkeckboxChange = (e, elem) => {
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

	validate = (fieldValues = this.state) => {
		console.log('fieldValues:', fieldValues);
		let temp = {};
		if ('name' in fieldValues)
			temp.name = fieldValues.name ? '' : 'This field is required.';
		//if ('color' in fieldValues)
		//	temp.color = fieldValues.color ? '' : 'This field is required.';
		//temp.Email = (/^$|.+@.+..+/).test(fieldValues.Email)? "" : "Email is not valid"
		this.setState({ Errors: { ...temp } });
		if (fieldValues == this.state)
			//[ ...this.state ].filter(x => x !== this.state.Errors)
			return Object.values(temp).every(x => x == '');
		console.log('temp :', temp);
	};

	handelSubmit = e => {
		e.preventDefault();

		console.log('Post-Data');
		if (this.validate()) {
			const formData = new FormData(e.target);

			if (formData.get('id') == 0) {
				this.props.createCategory(formData);
				// window.alert('inserted.' + data);
			} else {
				console.log('request update', formData);
				this.props.updateCategory(formData.get('id'), formData);
				// window.alert('updated.' + data);
			}

			console.log('History from Country', this.props);
			this.props.history.goBack();
		}
	};

	render() {
		const { id, name, color, parentId, isMenu, isHome, isSlider, isTiker } = this.state;
		const Default = this.state.default;
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
										<h4 className="card-title">CATEGORY</h4>
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
											<input
												className="validate"
												id="id"
												name="id"
												type="hidden"
												value={id}
											/>
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
												{...(errors.Name && {
													error: 'true',
													'data-pattern-error': errors.Name,
												})}
											/>
											<small className="errorTxt1"></small>
										</div>
										<div className="input-field col s12">
											<div id="color-component" className="file-field">
												<div className="btn"></div>
												<div className="file-path-wrapper">
													<input
														dir="ltr"
														className="validate right-align"
														id="color"
														type="text"
														name="color"
														data-error=".errorTxt5"
														onChange={this.handelInputChange}
														value={color}
													/>
												</div>
											</div>
											<div className="input-field col s12">
												<div className="row">
													<div className="switch col s4">
														<label htmlFor="DefaultSwitch">
															<input
																id="DefaultSwitch"
																type="checkbox"
																onChange={(e) => this.handelCkeckboxChange(e, this.DefaultSwitch)}
																checked={Default}
															/>
															<span className="lever"></span>
															Default
														</label>
														<input
															id="default"
															ref={el => (this.DefaultSwitch = el)}
															name="default"
															type="hidden"
															value={Default ? 'true' : 'false'}
														></input>
													</div>
													<div className="switch col s4">
														<label htmlFor="IsMenuSwitch">
															<input
																id="IsMenuSwitch"
																type="checkbox"
																onChange={(e) => this.handelCkeckboxChange(e, this.IsMenuSwitch)}
																checked={isMenu}
															/>
															<span className="lever"></span>
															Is Menu
														</label>
														<input
															id="isMenu"
															ref={el => (this.IsMenuSwitch = el)}
															name="isMenu"
															type="hidden"
															value={isMenu ? 'true' : 'false'}
														></input>
													</div>
													<div className="switch col s4"></div>
												</div>
												<div className="row">
													<div className="switch col s4">
														<label htmlFor="IsHomeSwitch">
															<input
																id="IsHomeSwitch"
																type="checkbox"
																onChange={(e) => this.handelCkeckboxChange(e, this.IsHomeSwitch)}
																checked={isHome}
															/>
															<span className="lever"></span>
															Is Home
														</label>
														<input
															id="isHome"
															ref={el => (this.IsHomeSwitch = el)}
															name="isHome"
															type="hidden"
															value={isHome ? 'true' : 'false'}
														></input>
													</div>
													<div className="switch col s4">
														<label htmlFor="IsSliderSwitch">
															<input
																id="IsSliderSwitch"
																type="checkbox"
																onChange={(e) => this.handelCkeckboxChange(e, this.IsSliderSwitch)}
																checked={isSlider}
															/>
															<span className="lever"></span>
															Is Slider
														</label>
														<input
															id="isSlider"
															ref={el => (this.IsSliderSwitch = el)}
															name="isSlider"
															type="hidden"
															value={isSlider ? 'true' : 'false'}
														></input>
													</div>
													<div className="switch col s4">
														<label htmlFor="IsTikerSwitch">
															<input
																id="IsTikerSwitch"
																type="checkbox"
																onChange={(e)=>this.handelCkeckboxChange(e,this.IsTikerSwitch)}
																checked={isTiker}
															/>
															<span className="lever"></span>
															Is Tiker
														</label>
														<input
															id="isTiker"
															ref={el => (this.IsTikerSwitch = el)}
															name="isTiker"
															type="hidden"
															value={isTiker ? 'true' : 'false'}
														></input>
													</div>
												</div>
											</div>
											<small className="errorTxt5"></small>
										</div>
										<div className="input-field col s12">
											<label
												htmlFor="parentId"
												style={{
													position: 'absolute',
													top: '-14px',
													'font-size': '0.8rem',
												}}
											>
												Parent *
											</label>
											<select
												className="validate select2-data-array browser-default"
												id="parentId"
												type="text"
												name="parentId"
												data-error=".errorTxt5"
												onChange={this.handelInputChange}
												value={parentId}
											></select>
											<small className="errorTxt5"></small>
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
	console.log(state.Categories);
	return {
		data: state.Categories,
	};
};

const mapActionToProps = {
	createCategory: requestCreateCategory,
	updateCategory: requestUpdateCategory,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CategoryForm));
