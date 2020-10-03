import React, { Component } from 'react';

export default class BackButton extends Component {
	render() {
		return (
			<div>
				<a href={this.props.link}>
					<button
						class="btn waves-effect waves-light "
						type="submit"
						name="action"
					>
						Back
						<i class="material-icons right">arrow_back</i>
					</button>
				</a>
			</div>
		);
	}
}
