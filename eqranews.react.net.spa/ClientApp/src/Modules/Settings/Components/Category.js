import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { DTable } from '../../_shared/components/DTable';
import {
	requestFetchAllCategories,
	requestDeleteCategory,
} from '../Actions/Category';
import { Link } from 'react-router-dom';
import { CategoryForm } from './CategoryForm';
export class Category extends Component {
	componentWillMount = () => {
		//this.state = { loaded: false };
		this.columns = [
			{ title: 'Id', name: 'id', width: '10%' },
			{ title: 'Name', name: 'name' },
			{ title: 'Color', name: 'color' },
			{ title: 'Default', name: 'default' },
			{ title: 'Parent', name: 'parentId', searchable: true },
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
			{ responsivePriority: 1, targets: [3, 5, 6] },
			{
				targets: 2,
				createdCell: (td, cellData, rowData, row, col) => {
					return ReactDOM.render(
						<div class="col s6 m3 l2">
							<a
								class="btn z-depth-2"
								style={{
									background: rowData[2],
									cursor: 'default',
									minWidth: '120px',
								}}
							>
								{rowData[2]}
							</a>
						</div>,
						td
					);
				},
			},
			{
				targets: 3,
				searchable: true,
				createdCell: (td, cellData, rowData, row, col) => {
					console.log('rowData[3]', rowData[3]);
					this.forceUpdate();
					return ReactDOM.render(
						<label>
							<input
								type="checkbox"
								checked={rowData[3] ? 'checked' : ''}
								disabled="disabled"
							/>
							<span></span>
						</label>,
						td
					);
				},
			},
			{
				targets: 4,
				searchable: true,
				createdCell: (td, cellData, rowData, row, col) => {
					return ReactDOM.render(
						<div class="col s6 m3 l2">
							{rowData[4]
								? this.props.data.filter(x => x.id == rowData[4])[0].name
								: ''}
						</div>,
						td
					);
				},
			},
			{
				targets: 5,
				createdCell: (td, cellData, rowData, row, col) => {
					const linkStr = '/settings/category/' + rowData[0];
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer', color: 'green' }}
							onClick={() => {
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
				targets: 6,
				createdCell: (td, cellData, rowData, row, col) => {
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer', color: 'red' }}
							onClick={() => {
								this.props.DeleteCategory(rowData[0]);
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
		this.props.FetchAllCategories();
	};

	componentDidMount = () => {
		this.forceUpdate();
	};

	componentWillUnmount = () => {
		delete this.columnDefs;
		delete this.columns;
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
		console.log('Categories Data', this.props.data);
		return (
			<section className="users-list-wrapper section">
				<div className="users-list-table">
					<Link
						to="/settings/category"
						component={CategoryForm}
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
	console.log('Categories', state);
	return {
		data: state.Categories,
	};
};

const mapActionToProps = {
	FetchAllCategories: requestFetchAllCategories,
	DeleteCategory: requestDeleteCategory,
};

export default connect(mapStateToProps, mapActionToProps)(Category);
