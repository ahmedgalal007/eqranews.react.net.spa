import '../../../vendors/data-tables/css/jquery.dataTables.css';
import '../../../vendors/data-tables/extensions/responsive/css/responsive.dataTables.css';
// import '../CSS/page-users.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { DTable } from '../../_shared/components/DTable';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import {
	requestFetchAllCountries,
	requestDeleteCountry,
} from '../Actions/Country';
import { Link } from 'react-router-dom';
import { CountryForm } from './CountryForm';
// var $ = require('jquery');
export class Country extends Component {
	componentWillMount = () => {
		//this.state = { loaded: false };
		this.columns = [
			{ title: 'Id', name: 'id', width: '10%' },
			{ title: 'Name', name: 'name' },
			{ title: 'Code', name: 'isoCode' },
			{
				width: '10%',
				title: 'Edit',
				class: '',
				orderable: false,
				data: null,
				defaultContent: '',
			},
			{
				width: '10%',
				title: 'Delete',
				class: '',
				orderable: false,
				data: null,
				defaultContent: '',
			},
		];

		this.columnDefs = [
			{ responsivePriority: 1, targets: [3, 4] },
			{
				//render: EditButton,
				// createdCell: EditButton,
				targets: 3,
				// createdCell: this.createEditButton,
				createdCell: (td, cellData, rowData, row, col) => {
					const linkStr = '/settings/country/' + rowData[0];
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer', color: 'green' }}
							onClick={() => {
								//console.log(props.history);
								this.props.history.push(linkStr);
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
				createdCell: (td, cellData, rowData, row, col) => {
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer', color: 'red' }}
							onClick={() => {
								this.props.DeleteCountry(rowData[0]);
							}}
						>
							<i className="material-icons">delete</i>
						</a>,
						td
					);
				},
			},
		];

		//if (this.props.data.length == 0)
		this.props.FetchAllCountries();
	};

	componentDidMount = () => {
		this.forceUpdate();
	};

	tableData = dataArray => {
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
			if (x.title) res[x.title] = d[i++];
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
		//console.log('Crawl props', this.props);
		console.log('Countries Props', this.props);
		return (
			<section className="users-list-wrapper section">
				<div className="users-list-table">
					<Link
						to="/settings/country/0"
						component={CountryForm}
						className="btn-floating btn-large waves-effect waves-light red"
					>
						<i class="material-icons">add</i>
					</Link>
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

	createEditButton = (td, cellData, rowData, row, col) => {
		const linkStr = '/settings/country/' + rowData[0];
		td.innerHTML = `
			<a
				style="cursor: pointer; color: green"
				onclick="${"() => {this.props.history.push('" + linkStr + "');}"}"
			>
				<i class="material-icons">edit</i>
			</a>`;
	};
}

const mapStateToProps = state => {
	console.log('Countries', state);
	return {
		data: state.Countries,
	};
};

const mapActionToProps = {
	FetchAllCountries: requestFetchAllCountries,
	DeleteCountry: requestDeleteCountry,
};

export default connect(mapStateToProps, mapActionToProps)(Country);
