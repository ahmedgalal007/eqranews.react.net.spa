import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../CSS/page-users.css';
import { requestCrawlSourceFetchAll } from '../Actions/CrawlSource';
import { connect } from 'react-redux';
import CrawlRecord from './CrawlRecord';
import CrawlSource from './CrawlSource';
import { withRouter } from 'react-router-dom';
import { DTable } from '../../_shared/components/DTable';
// import '../JS/jquery.dataTables';
// import '../JS/dataTables.responsive';
// import '../JS/page-users';

// var $ = require('jquery');
const Crawl = props => {
	// const [currentPage, setcurrentPage] = useState(1);
	// const [pageCount, setpageCount] = useState(0);
	// const [pageRecords, setpageRecords] = useState(10);

	const columns = [
		{
			class: 'details-control',
			orderable: false,
			data: null,
			defaultContent: '',
		},
		{ title: 'Id' },
		{ title: 'Name' },
		{ title: 'Domain' },
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

	const data = [
		{
			Id: 1,
			Name: 'Akhbar',
			Domain: 'http://www.akhbarelyom.com',
			CountryId: 1,
		},
		{ Id: 2, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
		{
			Id: 3,
			Name: 'El Masry El Yom',
			Domain: 'http://www.elmasry.com',
			CountryId: 1,
		},
		{
			Id: 4,
			Name: 'Akhbar',
			Domain: 'http://www.akhbarelyom.com',
			CountryId: 1,
		},
		{ Id: 5, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
		{
			Id: 6,
			Name: 'El Masry El Yom',
			Domain: 'http://www.elmasry.com',
			CountryId: 1,
		},
		{
			Id: 7,
			Name: 'Akhbar',
			Domain: 'http://www.akhbarelyom.com',
			CountryId: 1,
		},
		{ Id: 8, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
		{
			Id: 9,
			Name: 'El Masry El Yom',
			Domain: 'http://www.elmasry.com',
			CountryId: 1,
		},
		{
			Id: 10,
			Name: 'Akhbar',
			Domain: 'http://www.akhbarelyom.com',
			CountryId: 1,
		},
		{ Id: 11, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
		{
			Id: 12,
			Name: 'El Masry El Yom',
			Domain: 'http://www.elmasry.com',
			CountryId: 1,
		},
		{
			Id: 13,
			Name: 'Akhbar',
			Domain: 'http://www.akhbarelyom.com',
			CountryId: 1,
		},
		{ Id: 14, Name: 'Ahram', Domain: 'http://alahram.org.eg', CountryId: 1 },
		{
			Id: 15,
			Name: 'El Masry El Yom',
			Domain: 'http://www.elmasry.com',
			CountryId: 1,
		},
	];

	const columnDefs = [
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
							props.history.replace(linkStr);
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
	const tableData = dataArray => {
		return dataArray.map((x, i) => {
			const res = [];
			columns.map((n, l) => {
				res.push(n.title ? x[n.title] : '');
			});
			return res;
		});
	};

	const formate = (d, cols = []) => {
		const res = {};
		let i = 0;
		cols.map((x, i) => {
			if (x.title) res[x.title] = d[i++];
		});

		return (
			<tr>
				<td colSpan={columns.length}>
					<CrawlRecord record={res} />
				</td>
			</tr>
		);
	};

	props.requestCrawlSourceFetchAll();

	console.log('Crawl M', window.M);
	console.log('Crawl props', props);
	return (
		<div className="users-list-table">
			<div className="card">
				<div className="card-content">
					<DTable
						data={tableData(props.data)}
						columns={columns}
						formate={formate}
						columnDefs={columnDefs}
					></DTable>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	console.log('Crawl', state);
	return {
		data: state.CrawlSources.list,
	};
};

const mapActionToProps = {
	requestCrawlSourceFetchAll: requestCrawlSourceFetchAll,
	//requestCrawlSourceDelete: requestCrawlSourceDelete,
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(Crawl));

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
