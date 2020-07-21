import React, { Component } from 'react';

export default class RightSidebarSettingsGroup extends Component {
	render() {
		return (
			<React.Fragment>
				<p className="setting-header mt-8 mb-3 ml-5 font-weight-900">
					{this.props.Label}
				</p>
				<ul className="collection border-none">
					{this.props.SettingItems.map((item, i) => {
						return (
							<li
								key={`setting-item-${i}`}
								className="collection-item border-none"
							>
								<div className="m-0">
									<span>{item.Name}</span>
									<div className="switch right">
										<label>
											<input
												defaultChecked={item.Enabled ? 'defaultChecked' : ''}
												type="checkbox"
											/>
											<span className="lever"></span>
										</label>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</React.Fragment>
		);
	}
}
