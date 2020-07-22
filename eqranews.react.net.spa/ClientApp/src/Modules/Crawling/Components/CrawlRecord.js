import React, { Fragment } from 'react';

export default function CrawlRecord(props) {
	const { Id, Name, Domain, CountryId } = { ...props.record };
	return (
		<Fragment>
			<td></td>
			<td>{Id}</td>
			<td>
				<a href="page-users-view.html">{Name}</a>
			</td>
			<td>
				<a href={Domain}>{Domain}</a>
			</td>
			<td>{CountryId}</td>
			<td>
				<a href="page-users-edit.html">
					<i class="material-icons">edit</i>
				</a>
			</td>
			<td>
				<a href="page-users-view.html">
					<i class="material-icons">remove_red_eye</i>
				</a>
			</td>
		</Fragment>
	);
}
