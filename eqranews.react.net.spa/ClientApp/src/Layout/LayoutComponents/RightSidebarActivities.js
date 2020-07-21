import React, { Component } from 'react';
import RightSidebarِActivitiesGroup from './RightSidebarِActivitiesGroup';

export default class RightSidebarActivities extends Component {
	constructor(props) {
		super(props);
		this.elemRef = React.createRef();
		this.headerElem = document.createElement('li');
		this.headerElem.classList.add('tab', 'col', 's4', 'p-0');
		this.headerElem.innerHTML = `<a href="#${this.props.ID}" class="active"><span>${this.props.Label}</span></a>`;

		this.SystemLogs = [
			{
				iconColor: 'green',
				active: true,
				time: 'Today',
				title: 'Homepage mockup design',
				text: 'Melissa liked your activity.',
				payload: { type: 'status', text: 'Important', color: 'orange' },
			},
			{
				iconColor: 'cyan',
				active: true,
				time: '10 min',
				title: 'Melissa liked your activity Drinks.',
				text: 'Here are some news feed interactions concepts.',
				payload: { type: 'status', text: 'Resolved', color: 'green' },
			},
			{
				iconColor: 'red',
				active: true,
				time: '30 mins',
				title: '12 new users registered',
				text: 'Here are some news feed interactions concepts.',
				payload: {
					type: 'content',
					desc: 'Registration.doc',
					image: {
						src: '../../../app-assets/images/icon/pdf.png',
						alt: 'document',
						className: 'mr-1',
						width: '25',
						height: '30',
					},
				},
			},
			{
				iconColor: 'indigo',
				active: true,
				time: '2 Hrs',
				title: 'Tina is attending your activity',
				text: 'Here are some news feed interactions concepts.',
				payload: {
					type: 'content',
					desc: 'Activity.doc',
					image: {
						src: '../../../app-assets/images/icon/pdf.png',
						alt: 'document',
						className: 'mr-1',
						width: '25',
						height: '30',
					},
				},
			},
			{
				iconColor: 'orange',
				active: false,
				time: '5 hrs',
				title: 'Josh is now following you',
				text: 'Here are some news feed interactions concepts.',
				payload: { type: 'status', text: 'Pending', color: 'red' },
			},
		];

		this.ApplicationsLogs = [
			{
				iconColor: 'green',
				active: true,
				time: 'Just now',
				title: 'New order received urgent',
				text: 'Melissa liked your activity.',
				payload: { type: 'status', text: 'Important', color: 'orange' },
			},
			{
				iconColor: 'cyan',
				active: true,
				time: '05 min',
				title: 'System shutdown.',
				text: 'Here are some news feed interactions concepts.',
				payload: { type: 'status', text: 'Urgent', color: 'blue' },
			},
			{
				iconColor: 'indigo',
				active: true,
				time: '20 mins',
				title: 'Database overloaded 89%',
				text: 'Here are some news feed interactions concepts.',
				payload: {
					type: 'content',
					desc: 'Database-log.doc',
					image: {
						src: '../../../app-assets/images/icon/pdf.png',
						alt: 'document',
						className: 'mr-1',
						width: '25',
						height: '30',
					},
				},
			},
		];

		this.ServerLogs = [
			{
				iconColor: 'green',
				active: true,
				time: '10 min',
				title: 'System error',
				text: 'Melissa liked your activity.',
				payload: { type: 'status', text: 'Error', color: 'red' },
			},
			{
				iconColor: 'cyan',
				active: true,
				time: '1 min',
				title: 'Production server down.',
				text: 'Here are some news feed interactions concepts.',
				payload: { type: 'status', text: 'Urgent', color: 'blue' },
			},
		];
	}

	componentDidMount = () => {
		this.elemRef.current.parentNode.parentNode
			.querySelector('ul.tabs')
			.append(this.headerElem);
		console.log(
			'Tab Element',
			this.elemRef.current.parentNode.parentNode.querySelector('ul.tabs')
		);
	};
	render() {
		return (
			<div ref={this.elemRef} id={this.props.ID} className="col s12">
				<div className="activity">
					<RightSidebarِActivitiesGroup
						Label="SYSTEM LOGS"
						ActivityItems={this.SystemLogs}
					/>

					<RightSidebarِActivitiesGroup
						Label="APPLICATIONS LOGS"
						ActivityItems={this.ApplicationsLogs}
					/>
					<RightSidebarِActivitiesGroup
						Label="SERVER LOGS"
						ActivityItems={this.ServerLogs}
					/>

					<p className="mt-5 mb-0 ml-5 font-weight-900">SERVER LOGS</p>
					<ul className="widget-timeline mb-0"></ul>
				</div>
			</div>
		);
	}
}
