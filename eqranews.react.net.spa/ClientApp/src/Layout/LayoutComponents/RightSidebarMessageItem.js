import React, { Component } from 'react';

export default class RightSidebarMessageItem extends Component {
	render() {
		return (
			<li
				className="collection-item right-sidebar-chat-item sidenav-trigger display-flex avatar pl-5 pb-0"
				data-target="slide-out-chat"
			>
				<span
					className={`avatar-status ${
						this.props.message.online ? 'avatar-online' : 'avatar-off'
					} avatar-50`}
				>
					<img src={this.props.message.avatar} alt="avatar" />
					<i></i>
				</span>
				<div className="user-content">
					<h6 className="line-height-0">{this.props.message.sender}</h6>
					<p className="medium-small blue-grey-text text-lighten-3 pt-3">
						{this.props.message.content}
					</p>
				</div>
				<span className="secondary-content medium-small">
					{this.props.message.time}
				</span>
			</li>
		);
	}
}
