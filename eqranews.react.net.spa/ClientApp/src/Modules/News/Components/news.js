import React, { Component, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { NewsItems } from '../Reducers/news';
import { DTable } from '../../_shared/components/DTableServer';
import * as FormUtils from '../../_shared/lib/FormUtils';

import {
	requestFetchAllNews,
	requestFetchNewsByCategory,
	requestFetchNewsById,
	requestDeleteNews,
} from '../Actions/news';
import { requestFetchAllCountries } from '../../Settings/Actions/Country';

export class News extends Component {
	componentDidMount = () => {
		// if (!(this.props.countries && this.props.countries.length > 0))
		this.props.FetchAllCountries();
		this.props.FetchAllNews();
	};
	componentWillMount = () => {

		this.props.FetchAllNews();

		this._IsMounted = true;

		if (this._IsMounted) {
			this.columns = [
				{ title: 'ID', name: 'id' },
				{ title: 'Title', name: 'title' },
				{ title: 'Country', name: 'countryId' },
				{ title: 'Source', name: 'sourceId' },
				{
					title: 'Edit',
					width: 50,
					class: '',
					orderable: false,
					data: null,
					defaultContent: '',
				},
				{
					title: 'Delete',
					width: 50,
					class: '',
					orderable: false,
					data: null,
					defaultContent: '',
				},
			];

			this.columnDefs = [
				{
					targets: 2,
					createdCell: (td, cellData, rowData, row, col) => {
						const linkStr = '/settings/country/' + rowData[2];
						const Country = this.props.countries.filter(
							x => x.id == rowData[2]
						);
						return ReactDOM.render(
							<a
								style={{ cursor: 'pointer' }}
								className="danger"
								onClick={() => {
									//console.log(props.history);
									this.props.history.push(linkStr);
								}}
							>
								{Country && Country.length > 0
									? Country[0].name
									: 'Country Not Found!'}
							</a>,
							td
						);
					},
				},
				{
					targets: 3,
					createdCell: (td, cellData, rowData, row, col) => {
						const linkStr = '/crawl/source/' + rowData[3];
						const Country = this.props.CrawlSources.filter(
							x => x.id == rowData[3]
						);
						return ReactDOM.render(
							<a
								style={{ cursor: 'pointer' }}
								className="danger"
								onClick={() => {
									//console.log(props.history);
									this.props.history.push(linkStr);
								}}
							>
								{Country && Country.length > 0
									? Country[0].name
									: 'Country Not Found!'}
							</a>,
							td
						);
					},
				},
				{
					targets: 4,
					createdCell: FormUtils.createEditButton(
						'/news/newsitem/',
						this.props.history
					),
				},
				{
					targets: 5,
					createdCell: FormUtils.createDeleteButton(this.props.DeleteNews),
				},
				{ orderable: false, targets: [4, 5] },
				// { visible: true, targets: [6] },
			];
		}
	};
	componentWillUnmount = () => {
		this._IsMounted = false;

		//this.dt.destroy();
		this.setState = (state, callback) => {
			return;
		};
	};
	render() {
		return (
			<section className="users-list-wrapper section">
				<div className="users-list-table">
					{/* <Link
						to="/news"
						component={News}
						className="btn-floating btn-large waves-effect waves-light red"
					>
						<i className="material-icons">add</i>
					</Link> */}

					<div className="card">
						<div className="card-content">
							<DTable
								data={FormUtils.tableData(this.columns, this.props.data)}
								columns={this.columns}
								formate={this.formate}
								columnDefs={this.columnDefs}
								sAjaxSource="/api/News/DataTableHandler"
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
		data: state.NewsItems,
		CrawlSources: state.CrawlSources,
		countries: state.Countries,
	};
};

const mapActionToProps = {
	FetchAllCountries: requestFetchAllCountries,
	FetchAllNews: requestFetchAllNews,
	FetchNewsByCategory: requestFetchNewsByCategory,
	DeleteNews: requestDeleteNews,
};

export default connect(mapStateToProps, mapActionToProps)(withRouter(News));
