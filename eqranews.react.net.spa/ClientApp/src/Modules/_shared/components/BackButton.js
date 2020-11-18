import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
export class BackButton extends Component {
	RedirectToLink = () => {
		this.props.history.push(this.props.link, this.props.routeState);
		// return <Redirect to={{ pathname: this.props.link, state: {} }} />;
	};
	render() {
		return (
			<div>
				{
					// <a href={this.props.link}>
				}
				<button
					className="btn waves-effect waves-light "
					onClick={this.RedirectToLink}
					name="action"
				>
					Back
					<i className="material-icons right">arrow_back</i>
				</button>
				{
					// </a>
				}
			</div>
		);
	}
}

export default withRouter(BackButton);
