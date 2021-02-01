import '../css/dataTables/responsive.dataTables.min.css';
import '../css/dataTables/jquery.dataTables.min.css';
import '../css/dataTables/fixedColumns.dataTables.min.css';
import '../css/dataTables/page-users.css';
// import 'datatables.net-buttons-dt/css/buttons.dataTables.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as AppUtilities from '../lib/AppUtilities';
import { bindActionCreators } from 'redux';

import * as FormUtils from '../lib/FormUtils';

// const $ = require('jquery');
//$.DataTable = require('datatables.net');

// require('datatables.net-buttons-dt');
// const jzip = require('jzip');
//require('datatables.net-buttons/js/buttons.html5.min');

// window.JSZip = jzip;

export class DTable extends Component {
	_IsMounted = false;
	componentDidMount = () => {
		this._IsMounted = true;
		this.dt = null;
		//this.state = { loaded: false };
		if (this._IsMounted) {
			const scripts = AppUtilities.populateAllSctions();
			scripts.PAGE_VENDOR_JS.scripts.push(
				'/app-assets/vendors/data-tables/js/jquery.dataTables.min.js'
			);
			scripts.PAGE_VENDOR_JS.scripts.push(
				'/app-assets/vendors/data-tables/extensions/responsive/js/dataTables.responsive.min.js'
			);
			this.createDataTable();
	
		}
	};

	componentWillUnmount = () => {
		this._IsMounted = false;

		//this.dt.destroy();
		this.setState = (state, callback) => {
			return {};
		};
	};

	createDataTable = () => {
		const { columns, data, formate, columnDefs, sAjaxSource } = { ...this.props };
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
		if (sAjaxSource) {
			options.bProcessing = true;
			options.bServerSide = true;
			options.sAjaxSource = sAjaxSource;
			options.data = null;
			options.fnServerData = function (sSource, aoData, fnCallback, oSettings) {
				oSettings.jqXHR = $.ajax({
					"dataType": 'json',
					"type": "GET",
					"url": sSource,
					"data": aoData,
					"success": function (msg) {
						console.log("Msg:", msg);
						console.log("Columns:", columns);
						msg.aaData = FormUtils.tableData(columns, msg.aaData);
						//console.log("msg.aaData:", msg.aaData);

						fnCallback(msg);
						//$("#members").show();
					},
					"sPaginationType": "full_numbers",
					"bVisible": true,
					resetDisplay: false,
					processing: true,
					serverSide: true,
					responsive: true,
					stateSave: true,
				});
			};
        }
		const $ = window.jQuery || undefined;
		if ($) {
			this.$el = $(this.el);

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

		}
	};

	render() {
		return (
			<div className="responsive-table">
				<table
					id="users-list-datatable"
					className="table mdl-data-table"
					style={{ minHeight: '100px' }}
					ref={el => (this.el = el)}
				></table>
			</div>
		);
	}
}
