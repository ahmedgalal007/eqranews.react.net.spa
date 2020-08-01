import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import CrawlRecord from './CrawlRecord';
import CrawlSource from './CrawlSource';
import { withRouter } from 'react-router-dom';
import { DTable } from '../../_shared/components/DTable';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
import {
	requestCrawlSourceFetchAll,
	crawlSourceLoadStart,
} from '../Actions/CrawlSource';
// var $ = require('jquery');
export class Crawl extends Component {
	componentWillMount = () => {
		//this.state = { loaded: false };
		this.columns = [
			{
				class: 'details-control',
				orderable: false,
				data: null,
				defaultContent: '',
			},
			{ title: 'Id' },
			{ title: 'Name' },
			{ title: 'DomainUrl' },
			{ title: 'CountryId' },
			{
				class: '',
				orderable: false,
				data: null,
				defaultContent: '',
			},
			{
				class: '',
				orderable: false,
				data: null,
				defaultContent:
					'<a class="danger" href="/crawl/source/"><i class="material-icons">delete</i></a>',
			},
		];

		this.columnDefs = [
			{
				//render: EditButton,
				// createdCell: EditButton,
				targets: 5,
				createdCell: (td, cellData, rowData, row, col) => {
					const linkStr = '/crawl/sources/' + rowData[1];
					return ReactDOM.render(
						<a
							style={{ cursor: 'pointer' }}
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
			{ visible: true, targets: [6] },
		];
		//const scripts = AppUtilities.populateAllSctions();

		//AppUtilities.loadAllSectionsScripts(scripts).then(() => {
		//this.setState({ loaded: true });

		//if (!this.props.Loading) {
		if (document.querySelector('#reactloader')) {
			document.querySelector('#reactloader').remove();
		}
		// this.props.crawlSourceLoadStart();
		this.props.requestCrawlSourceFetchAll();
		//}
		//});
	};
	componentDidMount = () => {
		this.forceUpdate();
	};

	tableData = dataArray => {
		return dataArray.map((x, i) => {
			const res = [];
			this.columns.map((n, l) => {
				res.push(n.title ? x[n.title] : '');
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
					<CrawlRecord record={res} />
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
	//console.log('Crawl', state);
	return {
		data: state.CrawlSources,
		Loading: state.Loading,
	};
};

const mapActionToProps = {
	requestCrawlSourceFetchAll: requestCrawlSourceFetchAll,
	crawlSourceLoadStart: crawlSourceLoadStart,
	//requestCrawlSourceDelete: requestCrawlSourceDelete,
};

export default connect(mapStateToProps, mapActionToProps)(Crawl);

// const tmprender = sources => {
// 	return (
// 		<div class="col s12">
// 			<div class="container">
// 				<section class="users-list-wrapper section">
// 					<div class="users-list-filter">
// 						<div class="card-panel">
// 							<div class="row">
// 								<form>
// 									<div class="col s12 m6 l3">
// 										<label for="users-list-verified">الدولة</label>
// 										<div class="input-field">
// 											<select class="form-control" id="Country-list">
// 												<option value="">Any</option>
// 												<option value="Yes">Egypt</option>
// 												<option value="No">Saudi Arabia</option>
// 												<option value="No">Kuwait</option>
// 												<option value="No">الإمارات العربية المتحدة</option>
// 											</select>
// 										</div>
// 									</div>
// 									<div class="col s12 m6 l3"></div>
// 									<div class="col s12 m6 l3"></div>
// 									<div class="col s12 m6 l3 display-flex align-items-center show-btn">
// 										<button
// 											type="submit"
// 											class="btn btn-block indigo waves-effect waves-light"
// 										>
// 											Show
// 										</button>
// 									</div>
// 								</form>
// 							</div>
// 						</div>
// 					</div>
// 					<div class="users-list-table">
// 						<div class="card">
// 							<div class="card-content">
// 								{
// 									//<!-- datatable start -->
// 								}
// 								<div class="responsive-table">
// 									<table id="users-list-datatable" class="table">
// 										<thead>
// 											<tr>
// 												<th></th>
// 												<th>id</th>
// 												<th>Name</th>
// 												<th>Domain</th>
// 												<th>Country</th>
// 												<th>edit</th>
// 												<th>view</th>
// 											</tr>
// 										</thead>
// 										<tbody>
// 											{sources.map((x, i) => {
// 												return <CrawlRecord key={i} record={x} />;
// 											})}
// 										</tbody>
// 									</table>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</section>
// 			</div>
// 		</div>
// 	);
// };

// this.data = [
// 	{
// 		Id: 1,
// 		Name: 'Akhbar',
// 		Domain: 'http://www.akhbarelyom.com',
// 		CountryId: 1,
// 	},
// 	{ Id: 2, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
// 	{
// 		Id: 3,
// 		Name: 'El Masry El Yom',
// 		Domain: 'http://www.elmasry.com',
// 		CountryId: 1,
// 	},
// 	{
// 		Id: 4,
// 		Name: 'Akhbar',
// 		Domain: 'http://www.akhbarelyom.com',
// 		CountryId: 1,
// 	},
// 	{ Id: 5, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
// 	{
// 		Id: 6,
// 		Name: 'El Masry El Yom',
// 		Domain: 'http://www.elmasry.com',
// 		CountryId: 1,
// 	},
// 	{
// 		Id: 7,
// 		Name: 'Akhbar',
// 		Domain: 'http://www.akhbarelyom.com',
// 		CountryId: 1,
// 	},
// 	{ Id: 8, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
// 	{
// 		Id: 9,
// 		Name: 'El Masry El Yom',
// 		Domain: 'http://www.elmasry.com',
// 		CountryId: 1,
// 	},
// 	{
// 		Id: 10,
// 		Name: 'Akhbar',
// 		Domain: 'http://www.akhbarelyom.com',
// 		CountryId: 1,
// 	},
// 	{ Id: 11, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
// 	{
// 		Id: 12,
// 		Name: 'El Masry El Yom',
// 		Domain: 'http://www.elmasry.com',
// 		CountryId: 1,
// 	},
// 	{
// 		Id: 13,
// 		Name: 'Akhbar',
// 		Domain: 'http://www.akhbarelyom.com',
// 		CountryId: 1,
// 	},
// 	{ Id: 14, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
// 	{
// 		Id: 15,
// 		Name: 'El Masry El Yom',
// 		Domain: 'http://www.elmasry.com',
// 		CountryId: 1,
// 	},
// ];
