import '../css/jquery.dataTables.css';
import '../css/dataTables.custom.css';
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CrawlRecord from '../../Crawling/Components/CrawlRecord';

const $ = require('jquery');
$.DataTable = require('datatables.net');
require('datatables.net-select');

require('datatables.net-buttons-dt');
const jzip = require('jzip');
//require('datatables.net-buttons/js/buttons.html5.min');

window.JSZip = jzip;

export class Tbl extends Component {
	componentDidMount() {
		const { columns, data, formate } = { ...this.props };
		const detailRows = [];
		console.log(this.el);
		this.$el = $(this.el);

		let options = {
			data: data,
			columns: columns,
			select: true,
			processing: true,
			// "serverSide": true,
			buttons: ['copy', 'excel', 'pdf'],
		};

		const dt = this.$el.DataTable(options);

		const createForm = (data, tr) => {
			return ReactDOM.render(formate(data(), columns), tr);
		};

		$('.display > tbody').on('click', 'tr td.details-control', function () {
			var tr = $(this).closest('tr');
			var row = dt.row(tr);
			var idx = $.inArray(tr.attr('id'), detailRows);

			if (row.child.isShown()) {
				tr.removeClass('details');
				row.child.hide();

				// Remove from the 'open' array
				detailRows.splice(idx, 1);
			} else {
				tr.addClass('details');
				const $ReactContainer = $('<tr>');
				const frm = createForm(row.data, $ReactContainer.get(0));
				console.log('TR[0]:', row.child());
				row.child(frm).show();

				//row.child(elm).show();
				// Add to the 'open' array
				if (idx === -1) {
					detailRows.push(tr.attr('id'));
				}
			}
		});
	}

	componentWillUnmount() {}

	render() {
		return (
			<div>
				<table
					className="display"
					width="100%"
					ref={el => (this.el = el)}
				></table>
			</div>
		);
	}
}
