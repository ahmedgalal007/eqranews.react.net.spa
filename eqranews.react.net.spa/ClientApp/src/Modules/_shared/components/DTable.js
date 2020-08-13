// import '../css/dataTables/jquery.dataTables.min.css';
import '../css/dataTables/responsive.dataTables.min.css';
import '../css/dataTables/page-users.css';
import '../css/dataTables/fixedColumns.dataTables.min.css';
// import 'datatables.net-buttons-dt/css/buttons.dataTables.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as AppUtilities from '../lib/AppUtilities';
import { bindActionCreators } from 'redux';
// const $ = require('jquery');
//$.DataTable = require('datatables.net');

// require('datatables.net-buttons-dt');
// const jzip = require('jzip');
//require('datatables.net-buttons/js/buttons.html5.min');

// window.JSZip = jzip;

export class DTable extends Component {
	componentWillMount = () => {
		this.dt = null;
		//this.state = { loaded: false };
		const scripts = AppUtilities.populateAllSctions();
		scripts.PAGE_VENDOR_JS.scripts.push(
			'/app-assets/vendors/data-tables/js/jquery.dataTables.min.js'
		);
		scripts.PAGE_VENDOR_JS.scripts.push(
			'/app-assets/vendors/data-tables/extensions/responsive/js/dataTables.responsive.min.js'
		);
		// scripts.PAGE_LEVEL_JS.scripts.push('../../Crawling/JS/page-users.js');
		AppUtilities.loadAllSectionsScripts(scripts).then(() => {
			// document.addEventListener(
			// 	'DOMContentLoaded',
			// 	function (event) {
			this.createDataTable();
			// 	}.bind(this)
			// );

			this.forceUpdate();
		});
	};
	// componentWillUnmount = () => {
	// 	this.dt.destroy();
	// };

	createForm = (data, tr) => {
		//return ReactDOM.render(formate(data(), columns), tr);
		return <div> Details</div>;
	};
	createDataTable = () => {
		const { columns, data, formate, columnDefs } = { ...this.props };
		//console.log(this.el);
		const options = {
			responsive: false,
			autoWidth: false,
			columns: columns,
			fixedColumns: true,
			data: data,
			//select: true,
			//processing: true,
			// "serverSide": true,
			columnDefs: columnDefs,
		};

		const $ = window.jQuery || undefined;
		if ($) {
			this.$el = $(this.el);
			console.log('jQuery Loaded in DTable!!!!!!!!');
			//this.$el = $(this.el);

			//const detailRows = [];
			//const dt = this.$el.DataTable(this.options);

			$(document).ready(
				function () {
					if ($.fn.dataTable && !$.fn.dataTable.isDataTable(this.$el)) {
						// variable declaration
						var usersTable;
						var usersDataArray = [];
						this.dt = this.$el.removeAttr('width').DataTable(options);
					}
				}.bind(this)
			);

			//this.forceUpdate();

			// $('.display > tbody').on('click', 'tr td.details-control', function () {
			// 	var tr = $(this).closest('tr');
			// 	var row = dt.row(tr);
			// 	var idx = $.inArray(tr.attr('id'), detailRows);

			// 	if (row.child.isShown()) {
			// 		tr.removeClass('details');
			// 		row.child.hide();

			// 		// Remove from the 'open' array
			// 		detailRows.splice(idx, 1);
			// 	} else {
			// 		tr.addClass('details');
			// 		const $ReactContainer = $('<tr>');
			// 		const frm = this.createForm(row.data, $ReactContainer.get(0));
			// 		console.log('TR[0]:', row.child());
			// 		row.child(frm).show();

			// 		//row.child(elm).show();
			// 		// Add to the 'open' array
			// 		if (idx === -1) {
			// 			detailRows.push(tr.attr('id'));
			// 		}
			// 	}
			// });
		}
	};

	render() {
		return (
			<div className="responsive-table">
				<table
					id="users-list-datatable"
					className="table mdl-data-table"
					style={{ 'min-height': '100px' }}
					ref={el => (this.el = el)}
				></table>
			</div>
		);
	}
}
