import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestFetchNewsItemById } from '../Actions/newsItem';

class NewsItem extends Component {
	constructor(props) {
		super(props);

		const {
			match: { params },
		} = this.props;

		this.state = { id: params.id };
		this.props.FetchNewsItemById(params.id);
	}
	render() {
		const NewsItem = this.props.data;
		console.log('NEWS-ITEM >>>', NewsItem);
		return (
			<div>
				<h1>NewsItem</h1>
				<pre>{JSON.stringify(NewsItem)}</pre>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.NewsItem,
	};
};
const mapActionToProps = {
	FetchNewsItemById: requestFetchNewsItemById,
};
export default connect(mapStateToProps, mapActionToProps)(withRouter(NewsItem));
