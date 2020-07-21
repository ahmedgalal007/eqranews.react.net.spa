import React, { useState } from 'react';
import '../../../../public/app-assets/css-rtl/pages/page-users.css';
import actions from '../Actions/CrawlSource';
import { connect } from 'react-redux';
import CrawlRecord from './CrawlRecord';

import '../../../../public/app-assets/vendors/data-tables/js/jquery.dataTables';
import '../../../../public/app-assets/vendors/data-tables/extensions/responsive/js/dataTables.responsive';
import '../../../../public/app-assets/js/scripts/page-users';
const Crawl = props => {
	const [currentPage, setcurrentPage] = useState(1);
	const [pageCount, setpageCount] = useState(0);
	const [pageRecords, setpageRecords] = useState(10);

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
	];

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
												return <CrawlRecord record={x} />;
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
