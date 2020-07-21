import React, { Component } from 'react';
import RightSidebarSettingsGroup from './RightSidebarSettingsGroup';

export default class RightSidebarSettings extends Component {
	constructor(props) {
		super(props);
		this.elemRef = React.createRef();
		this.headerElem = document.createElement('li');
		this.headerElem.classList.add('tab', 'col', 's4', 'p-0');
		this.headerElem.innerHTML = `<a href="#${this.props.ID}" class="active"><span>${this.props.Label}</span></a>`;

		this.GeneralSettings = [
			{ Name: 'Notifications', Enabled: false },
			{ Name: 'Sh}ow recent activity', Enabled: true },
			{ Name: 'Sh}ow recent activity', Enabled: false },
			{ Name: 'Sh}ow Task statistics', Enabled: true },
			{ Name: 'Sh}ow your emails', Enabled: true },
			{ Name: 'Em}ail Notifications', Enabled: false },
		];

		this.SystemSettings = [
			{ Name: 'System Logs', Enabled: false },
			{ Name: 'Error Reporting', Enabled: false },
			{ Name: 'Applications Logs', Enabled: true },
			{ Name: 'Backup Servers', Enabled: false },
			{ Name: 'Audit Logs', Enabled: false },
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
				<RightSidebarSettingsGroup
					Label="GENERAL SETTINGS"
					SettingItems={this.GeneralSettings}
				/>
				<RightSidebarSettingsGroup
					Label="SYSTEM SETTINGS"
					SettingItems={this.SystemSettings}
				/>
			</div>
		);
	}
}
