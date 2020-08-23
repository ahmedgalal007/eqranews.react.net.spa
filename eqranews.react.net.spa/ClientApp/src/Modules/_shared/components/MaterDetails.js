import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DTable } from './DTable';
import FormUtils from '../../_shared/lib/FormUtils';

export default class MaterDetails extends Component {
	render() {
		const {
			title,
			AddLink,
			//component,
			data,
			columns,
			columnDefs,
			formate,
		} = this.props.options;
		return (
			<div>
				<div className="col s12">
					<div id="validations" className="card card-tabs">
						<div className="card-content">
							<div className="card-title">
								<div className="row">
									<div className="col s12 m6 l10">
										<h4 className="card-title">{title}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id="Crawl-Steppers">
					<section className="users-list-wrapper section">
						<div className="users-list-table">
							<Link
								to={{
									pathname: AddLink.pathName,
									state: AddLink.state,
								}}
								//component={component}
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
										data={FormUtils.tableData(columns, data)}
										columns={columns}
										formate={formate}
										columnDefs={columnDefs}
									></DTable>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		);
	}
}
