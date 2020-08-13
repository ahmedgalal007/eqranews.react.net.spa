import React, { Component } from 'react';
import {
	requestFetchCrawlStepperBySource,
	requestCreateCrawlStepper,
	requestUpdateCrawlStepper,
} from '../Actions/CrawlStepper';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import { Link } from 'react-router-dom';
import { DTable } from '../../_shared/components/DTable';
import FormUtils from '../../_shared/lib/FormUtils';
import CrawlStep from './CrawlStep';

export class CrawlStepper extends Component {
	constructor(props) {
		super(props);
		this.state = { crawlSourceId: 0 };
	}

	//validate({fullname: 'jenny'})
	initialFieldValues = (id = 0, sourceId) => {
		let result = {
			id: id,
			name: '',
			crawlSourceId: sourceId,
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

	handelInputChange = function (e) {
		const { name, value } = e.target;
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

			if (formData.get('id') == 0) {
				this.props.createCrawlStepper(formData);
			} else {
				alert('update Form');
				this.props.updateCrawlStepper(formData.get('id'), formData);
			}
		}
	};

	componentWillMount = () => {
		const {
			match: { params },
		} = this.props;
		console.log('Stepper Params:', params);
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
					'/crawl/stepper/' + params.source + '/' + params.id,
					this.props.history
				),
			},
			{
				targets: 3,
				createdCell: FormUtils.createDeleteButton(this.props.DeleteCrawlSource),
			},
		];
		// if (params.id) initialFieldValues.id = params.id;
		const initialFieldValues = this.initialFieldValues(
			params?.id || 0,
			this.props.location.state.crawlSourceId
		);
		this.state = { ...initialFieldValues, Errors: {} };
		// this.props.FetchCrawlStepperBySource(this.state.crawlSourceId);
		console.log('CRAWl STEPPER PROPS', this.props);
		const scripts = AppUtilities.populateAllSctions();
		AppUtilities.loadAllSectionsScripts(scripts).then(() => {
			if (window.jQuery) {
				const $ = window.jQuery;
				$(document).ready(() => {});
			}
		});
	};

	componentDidMount = () => {
		// if (params.id) initialFieldValues.id = params.id;

		if (window.jQuery && window.M) {
			const $ = window.jQuery;
		} else if (window.M) {
			document.addEventListener('DOMContentLoaded', function () {
				// var elems = document.querySelectorAll('select');
				// var instances = window.M.FormSelect.init(elems, {});
			});
		}
	};

	render() {
		const { id, name, crawlSourceId, crawlSteps } = this.state;
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
											to={`/crawl/step/${id}`}
											component={CrawlStep}
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
													data={FormUtils.tableData(this.columns, crawlSteps)}
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
		data: state.CrawlSteppers,
		countries: state.Countries,
	};
};

const mapActionToProps = {
	FetchCrawlStepperBySource: requestFetchCrawlStepperBySource,
	createCrawlStepper: requestCreateCrawlStepper,
	updateCrawlStepper: requestUpdateCrawlStepper,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withRouter(CrawlStepper));
