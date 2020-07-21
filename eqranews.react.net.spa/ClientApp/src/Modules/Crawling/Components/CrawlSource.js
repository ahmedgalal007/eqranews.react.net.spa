import React, { useState } from 'react';
import actions from '../Actions/CrawlSource';
import useForm from '../../_shared/components/useForm';
import { connect } from 'react-redux';

const initialFieldValues = {
	Name: '',
	Domain: 'https://',
	CountryId: 1,
};

const CrawlSource = props => {
	//validate({fullname: 'jenny'})
	const [CurrentId, setCurrentId] = useState(0);

	const validate = (fieldValues = Values) => {
		let temp = {};
		if ('Name' in fieldValues)
			temp.Name = fieldValues.Name ? '' : 'This field is required.';
		if ('Domain' in fieldValues)
			temp.Domain = fieldValues.Domain ? '' : 'This field is required.';
		//temp.Email = (/^$|.+@.+..+/).test(fieldValues.Email)? "" : "Email is not valid"
		setErrors({ ...temp });
		if (fieldValues == Values) return Object.values(temp).every(x => x == '');
	};
	const { Values, setValues, Errors, setErrors, handelInputChange } = useForm(
		initialFieldValues,
		validate
	);

	const handelSubmit = e => {
		e.preventDefault();
		if (validate()) {
			// window.alert('Validation succeeded.');
			console.log('CrawlSourcesProps', props);
			props.createCrawlSources(Values, () => window.alert('inserted.'));
		}
	};

	// const render = () => {
	return (
		<div className="row">
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
								className="formValidate"
								id="formValidate"
								method="post"
								onSubmit={handelSubmit}
								onChange={handelInputChange}
							>
								<div className="row">
									<div className="input-field col s12">
										<label htmlFor="Name">Name*</label>
										<input
											id="Name"
											name="Name"
											type="text"
											data-error=".errorTxt1"
											onChange={handelInputChange}
											value={Values.Name}
										/>
										<small className="errorTxt1"></small>
									</div>
									<div className="input-field col s12">
										<label htmlFor="Domain">Domain URL *</label>
										<input
											id="Domain"
											type="url"
											name="Domin"
											data-error=".errorTxt5"
											onChange={handelInputChange}
											value={Values.Domain}
										/>
										<small className="errorTxt5"></small>
									</div>
									<div className="col s12">
										<label htmlFor="CountryId">Country *</label>
										<div className="input-field">
											<select
												className="error"
												id="CountryId"
												name="CountryId"
												data-error=".errorTxt6"
												onChange={handelInputChange}
												value={Values.CountryId}
												required
											>
												<option value="">Choose Country</option>
												<option value="1">Egypt</option>
												<option value="2">Saudi Erabia</option>
												<option value="3">Kuwait</option>
											</select>
											<small className="errorTxt6"></small>
										</div>
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
};
// };

const mapStateToProps = state => {
	console.log(state.CrawlSource.list);
	return {
		crawlSourceList: state.CrawlSource.list,
	};
};

const mapActionToProps = {
	createCrawlSources: actions.CREATE,
	updateCrawlSources: actions.UPDATE,
};

export default connect(mapStateToProps, mapActionToProps)(CrawlSource);
