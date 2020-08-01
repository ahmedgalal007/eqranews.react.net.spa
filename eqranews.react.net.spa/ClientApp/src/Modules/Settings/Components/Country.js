import '../../../vendors/data-tables/css/jquery.dataTables.css';
import '../../../vendors/data-tables/extensions/responsive/css/responsive.dataTables.css';
// import '../CSS/page-users.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { DTable } from '../../_shared/components/DTable';
import * as AppUtilities from '../../_shared/lib/AppUtilities';
// import * as Actions from '../Actions/Country';
// var $ = require('jquery');
export class Crawl extends Component {
	componentWillMount = () => {
		//this.state = { loaded: false };
		this.columns = [
			{ title: 'Id' },
			{ title: 'Name' },
			{ title: 'IsoCode' },
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

		this.data = [
			{ Id: 1, Name: 'Egypt', IsoCode: 'EG' },
			{ Id: 2, Name: 'Saudi Erabia', IsoCode: 'SA' },
			{ Id: 3, Name: 'Kuwait', IsoCode: 'KW' },
		];

		this.columnDefs = [
			{
				//render: EditButton,
				// createdCell: EditButton,
				targets: 3,
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
			{ visible: true, targets: [4] },
		];
		const scripts = AppUtilities.populateAllSctions();

		AppUtilities.loadAllSectionsScripts(scripts).then(() => {
			//this.setState({ loaded: true });

			if (!this.props.Loading) {
				if (document.querySelector('#reactloader')) {
					document.querySelector('#reactloader').remove();
				}
				//this.props.crawlSourceLoadStart();

				//this.props.requestCrawlSourceFetchAll();
				this.forceUpdate();
			}
		});
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
		return (
			<section className="users-list-wrapper section">
				<div className="users-list-table">
					<div className="card">
						<div className="card-content">
							<DTable
								data={this.tableData(this.data)}
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
		//data: state.CrawlSources.list,
		//Loading: state.Loading,
	};
};

const mapActionToProps = {
	//requestCrawlSourceFetchAll: requestCrawlSourceFetchAll,
	//crawlSourceLoadStart: crawlSourceLoadStart,
	//requestCrawlSourceDelete: requestCrawlSourceDelete,
};

export default connect(mapStateToProps, mapActionToProps)(Crawl);
