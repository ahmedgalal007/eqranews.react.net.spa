import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { DTable } from '../../_shared/components/DTable';
import {
	requestFetchAllCrawlStepTypes,
	requestDeleteCrawlStepType,
} from '../Actions/CrawlStepType';
import { Link } from 'react-router-dom';
import CategoryForm from './CategoryForm';

export class CrawlStepType extends Component {
	componentWillMount = () => {
		//this.state = { loaded: false };
		this.props.FetchAllCrawlStepTypes();

		this.columns = [
			{ title: 'Id', name: 'id', width: 100 },
			{ title: 'Name', name: 'name' },
			{
				title: 'DELETE   /   EDIT',
				width: 100,
				className: 'dt-body-center dt-head-center ',
				orderable: false,
				data: null,
				defaultContent: '',
			},
			// {
			// 	width: '10%',
			// 	title: 'Delete',
			// 	class: '',
			// 	orderable: false,
			// 	data: null,
			// 	defaultContent: '',
			// },
		];

		this.columnDefs = [
			{
				targets: 2,
				createdCell: (td, cellData, rowData, row, col) => {
					const linkStr = '/settings/crawlsteptype/' + rowData[0];
					return ReactDOM.render(
						<div>
							<a
								className="waves-effect waves-red btn white green-text primary-content"
								style={{ cursor: 'pointer', color: 'green' }}
								onClick={() => {
									this.props.history.push(linkStr);
								}}
							>
								<i className="material-icons">edit</i>
							</a>
							<a
								className="waves-effect waves-red btn white red-text primary-content"
								style={{ cursor: 'pointer', color: 'red' }}
								onClick={() => {
									this.props.DeleteCrawlStepType(rowData[0]);
								}}
							>
								<i className="material-icons">delete</i>
							</a>
						</div>,

						td
					);
				},
			},
			// {
			// 	targets: 3,
			// 	createdCell: (td, cellData, rowData, row, col) => {
			// 		return ReactDOM.render(
			// 			<a
			// 				style={{ cursor: 'pointer', color: 'red' }}
			// 				onClick={() => {
			// 					this.props.DeleteCrawlStepType(rowData[0]);
			// 				}}
			// 			>
			// 				<i className="material-icons">delete</i>
			// 			</a>,
			// 			td
			// 		);
			// 	},
			// },
		];

		//if (this.props.data.length == 0)
	};

	componentDidMount = () => {
		this.forceUpdate();
	};

	componentWillUnmount = () => {
		delete this.columnDefs;
		delete this.columns;
	};

	tableData = dataArray => {
		console.log('dataArray:', dataArray);
		return dataArray.map((x, i) => {
			const res = [];
			this.columns.map((n, l) => {
				res.push(n.name ? x[n.name] : '');
			});
			return res;
		});
	};

	formate = (d, cols = []) => {
		const res = {};
		let i = 0;
		cols.map((x, i) => {
			if (x.name) res[x.name] = d[i++];
		});

		return (
			<tr>
				<td colSpan={this.columns.length}>
					{
						//<CrawlRecord record={res} />
					}
				</td>
			</tr>
		);
	};

	render() {
		//console.log('Crawl M', window.M);
		console.log('CRAWLSTEPTYPE PROPS', this.props);
		return (
			<section className="users-list-wrapper section">
				<div className="users-list-table">
					<Link
						to="/settings/crawlsteptype"
						component={CategoryForm}
						className="btn-floating btn-large waves-effect waves-light red"
					>
						<i class="material-icons">add</i>
					</Link>
					<a
						class="waves-effect waves-red btn white black-text primary-content"
						href="javascript:{void(0)}"
					>
						Wave
					</a>

					<div className="card">
						<div className="card-content">
							<DTable
								data={this.tableData(this.props.data)}
								columns={this.columns}
								formate={this.formate}
								columnDefs={this.columnDefs}
							></DTable>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => {
	console.log('CRAWL STEP TYPES :', state);
	return {
		data: state.CrawlStepTypes,
	};
};

const mapActionToProps = {
	FetchAllCrawlStepTypes: requestFetchAllCrawlStepTypes,
	DeleteCrawlStepType: requestDeleteCrawlStepType,
};

export default connect(mapStateToProps, mapActionToProps)(CrawlStepType);
