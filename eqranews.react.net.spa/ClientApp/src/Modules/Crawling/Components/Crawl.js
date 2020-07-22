import React, { useState } from 'react';
import '../CSS/page-users.css';
import actions from '../Actions/CrawlSource';
import { connect } from 'react-redux';
import CrawlRecord from './CrawlRecord';
import { Tbl } from '../../_shared/components/tbl';
// import '../JS/jquery.dataTables';
// import '../JS/dataTables.responsive';
// import '../JS/page-users';

var $ = require('jquery');
const Crawl = props => {
	const [currentPage, setcurrentPage] = useState(1);
	const [pageCount, setpageCount] = useState(0);
	const [pageRecords, setpageRecords] = useState(10);

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
			defaultContent:
				'<a href="page-users-view.html"><i class="material-icons">edit</i></a>',
		},
		{
			class: '',
			orderable: false,
			data: null,
			defaultContent:
				'<a href="page-users-view.html"><i class="material-icons">remove_red_eye</i></a>',
		},
	];

	const sources = [
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
					<CrawlRecord record={res} />{' '}
				</td>
			</tr>
		);
	};

	// function injectScriptAfter(SRC, afterSelector = 'body') {
	// 	const elem = document.createElement('script');
	// 	elem.src = SRC;
	// 	document.querySelector(afterSelector).after(elem);
	// 	return elem;
	// }

	// injectScriptAfter(
	// 	'/app-assets/vendors/data-tables/js/jquery.dataTables.min.js',
	// 	'#PAGE_VENDOR_JS'
	// ).onload = () => {
	// 	injectScriptAfter(
	// 		'/app-assets/vendors/data-tables/extensions/responsive/js/dataTables.responsive.min.js',
	// 		'#PAGE_VENDOR_JS'
	// 	).onload = () => {
	// 		injectScriptAfter(
	// 			'../../../app-assets/js/scripts/page-users.min.js',
	// 			'#PAGE_LEVEL_JS'
	// 		);
	// 	};
	// };

	return (
		<Tbl data={tableData(sources)} columns={columns} formate={formate}></Tbl>
	);
};

const mapStateToProps = state => {
	console.log('Crawl', state.CrawlSource.list);
	return {
		crawlSourceList: state.CrawlSource.list,
	};
};

const mapActionToProps = {
	createCrawlSources: actions.FETCH_ALL,
	updateCrawlSources: actions.DELETE,
};

export default connect(mapStateToProps, mapActionToProps)(Crawl);

const tmprender = sources => {
	return (
		<div class="col s12">
			<div class="container">
				<section class="users-list-wrapper section">
					<div class="users-list-filter">
						<div class="card-panel">
							<div class="row">
								<form>
									<div class="col s12 m6 l3">
										<label for="users-list-verified">الدولة</label>
										<div class="input-field">
											<select class="form-control" id="Country-list">
												<option value="">Any</option>
												<option value="Yes">Egypt</option>
												<option value="No">Saudi Arabia</option>
												<option value="No">Kuwait</option>
												<option value="No">الإمارات العربية المتحدة</option>
											</select>
										</div>
									</div>
									<div class="col s12 m6 l3"></div>
									<div class="col s12 m6 l3"></div>
									<div class="col s12 m6 l3 display-flex align-items-center show-btn">
										<button
											type="submit"
											class="btn btn-block indigo waves-effect waves-light"
										>
											Show
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="users-list-table">
						<div class="card">
							<div class="card-content">
								{
									//<!-- datatable start -->
								}
								<div class="responsive-table">
									<table id="users-list-datatable" class="table">
										<thead>
											<tr>
												<th></th>
												<th>id</th>
												<th>Name</th>
												<th>Domain</th>
												<th>Country</th>
												<th>edit</th>
												<th>view</th>
											</tr>
										</thead>
										<tbody>
											{sources.map((x, i) => {
												return <CrawlRecord key={i} record={x} />;
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
