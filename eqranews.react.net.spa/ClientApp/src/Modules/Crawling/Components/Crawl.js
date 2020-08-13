import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CrawlSource from './CrawlSource';
import { withRouter } from 'react-router-dom';
import { DTable } from '../../_shared/components/DTable';

import * as AppUtilities from '../../_shared/lib/AppUtilities';
import FormUtils from '../../_shared/lib/FormUtils';
import {
	requestFetchAllCrawlSources,
	requestDeleteCrawlSource,
} from '../Actions/CrawlSource';
import { requestFetchAllCountries } from '../../Settings/Actions/Country';

export class Crawl extends Component {
	componentWillMount = () => {
		this.columns = [
			{ title: 'ID', name: 'id', style: { width: '50px' } },
			{ title: 'NAME', name: 'name' },
			{ title: 'DOMIAN', name: 'domainURL' },
			{ title: 'COUNTRY', name: 'countryId' },
			{
				title: 'Edit',
				width: 120,
				class: '',
				orderable: false,
				data: null,
				defaultContent: '',
			},
			{
				Title: 'Delete',
				width: 120,
				class: '',
				orderable: false,
				data: null,
				defaultContent: '',
			},
		];

		this.columnDefs = [
			{
				targets: 3,
				createdCell: (td, cellData, rowData, row, col) => {
					const linkStr = '/settings/country/' + rowData[3];
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer' }}
							class="danger"
							onClick={() => {
								//console.log(props.history);
								this.props.history.push(linkStr);
							}}
						>
							{this.props.countries.filter(x => x.id == rowData[3])[0].name}
						</a>,
						td
					);
				},
			},
			{
				targets: 4,
				createdCell: FormUtils.createEditButton(
					'/crawl/source/',
					this.props.history
				),
			},
			{
				targets: 5,
				createdCell: FormUtils.createDeleteButton(this.props.DeleteCrawlSource),
			},
			{ orderable: false, targets: [0, 4, 5] },
			// { visible: true, targets: [6] },
		];

		if (!(this.props.countries && this.props.countries.length > 0))
			this.props.FetchAllCountries();
		this.props.FetchAllCrawlSources();
	};
	componentDidMount = () => {
		this.forceUpdate();
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
		console.log('Crawl M', window.M);
		console.log('Crawl props', this.props);
		return (
			<section className="users-list-wrapper section">
				<div className="users-list-table">
					<Link
						to="/crawl/source"
						component={CrawlSource}
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
								data={FormUtils.tableData(this.columns, this.props.data)}
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
	return {
		data: state.CrawlSources,
		countries: state.Countries,
	};
};

const mapActionToProps = {
	FetchAllCountries: requestFetchAllCountries,
	FetchAllCrawlSources: requestFetchAllCrawlSources,
	DeleteCrawlSource: requestDeleteCrawlSource,
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(Crawl));
