import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	requestCreateCrawlStepType,
	requestUpdateCrawlStepType,
} from '../Actions/CrawlStepType';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import { withRouter } from 'react-router-dom';

export class CrawlStepTypeForm extends Component {
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
	componentDidMount = () => {
		//const scripts = AppUtilities.populateAllSctions();
		//AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		//	this.forceUpdate();
		//});
	};
	//validate({fullname: 'jenny'})
	initialFieldValues = (id = 0) => {
		let result = {
			id: id,
			name: '',
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
			// window.alert('Validation succeeded.');

			// const formData = new FormData();
			const formData = new FormData(e.target);

			//console.log('Form-State', this.state);
			// Object.keys(this.state).forEach(key => {
			// 	if (key != 'Errors') {
			// 		formData.append(key, this.state[key]);
			// 	}
			// });
			// for (let [key, value] of formData) {
			// 	console.log('Form-key-' + key, value);
			// }

			const data = { ...this.state };
			delete data.Errors;

			if (formData.get('id') == 0) {
				this.props.createCrawlStepType(formData);
				// window.alert('inserted.' + data);
			} else {
				console.log('request update', data);
				this.props.updateCrawlStepType(formData.get('id'), formData);
				// window.alert('updated.' + data);
			}

			console.log('History from Country', this.props);
			this.props.history.goBack();
		}
	};

	render() {
		const { id, name, isoCode, crawlSources } = this.state;
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
										<h4 className="card-title">CRAWL STEP TYPE</h4>
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
											<Link
												to="/settings/crawlsteptypes/"
												className="btn waves-effect waves-light right"
											>
												Cancel
												<i
													className="material-icons right"
													style={{ transform: 'scaleX(-1)' }}
												>
													send
												</i>
											</Link>
											<button
												className="btn waves-effect waves-light right submit"
												type="submit"
												name="action"
											>
												Submit
												<i className="material-icons left">send</i>
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
		data: state.CrawlStepTypes,
	};
};

const mapActionToProps = {
	createCrawlStepType: requestCreateCrawlStepType,
	updateCrawlStepType: requestUpdateCrawlStepType,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CrawlStepTypeForm));
