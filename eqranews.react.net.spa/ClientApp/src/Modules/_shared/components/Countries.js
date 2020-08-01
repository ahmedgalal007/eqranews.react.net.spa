import React, { Component } from 'react';
import { connect } from 'react-redux';

class Countries extends Component {
	render() {
		return <div>{console.log(this.props)}</div>;
	}
}
const mapStateToProps = state => {
	return state;
};
export default connect(mapStateToProps)(Countries);
