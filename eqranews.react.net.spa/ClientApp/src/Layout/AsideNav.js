import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
export class AsideNav extends Component {
	render() {
		const { title, icon, color, routeArr } = { ...this.props.routes };
		return (
			<li className="bold">
				<a className="collapsible-header waves-effect waves-cyan">
					<i className="material-icons">{icon}</i>
					<span className="menu-title" data-i18n="Menu levels">
						{title}
					</span>
				</a>
				<div className="collapsible-body">
					<ul
						className="collapsible collapsible-sub"
						data-collapsible="accordion"
					>
						{routeArr.map((x, i) => {
							return this.renderLink(x);
						})}
					</ul>
				</div>
			</li>
		);
	}

	renderLink = (x, active = false) => {
		return (
			<li key={x.path}>
				<Link
					to={x.path}
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
						this.props.routerPageChange(x);
						this.props.history.push(x.path);
					}}
				>
					<i className="material-icons">
						{active ? 'radio_button_checked' : 'radio_button_unchecked'}
					</i>
					<span data-i18n="Second level">{x.title}</span>
				</Link>
			</li>
		);
	};
}

const mapStateToProps = state => {
	return {
		CurrentPage: state.RouterCurrentPage,
	};
};

const mapActionsToProps = {
	routerPageChange: data => ({
		type: 'ROUTER_PAGE_CHANGED',
		data: data,
	}),
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withRouter(AsideNav));
