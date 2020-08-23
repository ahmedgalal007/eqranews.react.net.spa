import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export const tableData = (columns, dataArray) => {
	return dataArray.map((x, i) => {
		const res = [];
		columns.map((n, l) => {
			res.push(n.name ? x[n.name] : '');
		});
		return res;
	});
};

export const createEditButton = (path, history, routeState = {}) => {
	return (td, cellData, rowData, row, col) => {
		const linkStr = path + rowData[0];
		return ReactDOM.render(
			<a
				style={{ cursor: 'pointer' }}
				className="danger"
				onClick={() => {
					history.push({ pathname: linkStr, state: routeState });
				}}
			>
				<i className="material-icons">edit</i>
			</a>,
			td
		);
	};
};

export const createDeleteButton = action => {
	return (td, cellData, rowData, row, col) => {
		return ReactDOM.render(
			<a
				style={{ cursor: 'pointer', color: 'red' }}
				onClick={() => {
					action(rowData[0]);
				}}
			>
				<i className="material-icons">delete</i>
			</a>,
			td
		);
	};
};

export const createEditLink = (path, routeState = null) => {
	return (td, cellData, rowData, row, col) => {
		return ReactDOM.render(
			<Link to={{ pathname: path + rowData[0], state: routeState }}>
				<i className="material-icons">edit</i>
			</Link>,
			td
		);
	};
};

export default {
	tableData,
	createEditButton,
	createDeleteButton,
	createEditLink,
};
