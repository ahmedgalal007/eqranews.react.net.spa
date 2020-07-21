import React from 'react';
import { connect } from 'react-redux';
import CrawlingItem from './CrawlingItem';
import {
	clsCrawlingStep,
	clsCrawlingItem,
} from '../../../Models/Crawling/clsCrawling';

class CrawlingStep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			CrawlStep: new clsCrawlingStep(props.CrawlStep),
		};
	}

	AddCrawlItem = e => {
		var newState = this.state.CrawlStep;
		newState.CrawlItems.push(
			new clsCrawlingItem({ Name: '', Selector: '', Attr: '', Value: '' })
		);
		this.setState({ CrawlStep: newState });
	};

	render() {
		const { Type, URL, Selector, CrawlItems } = this.state.CrawlStep;
		return (
			<div className="crawling-step">
				<hr />
				<div>
					<span>Type: </span> {Type}
				</div>
				<div>
					<span>URL: </span> {URL}
				</div>
				<div>
					<span>Selector:</span> {Selector}
				</div>
				<div>
					<button
						className="btn btn-primary"
						value="+"
						onClick={this.AddCrawlItem}
					>
						+
					</button>
				</div>
				{CrawlItems.map((el, i) => {
					return (
						<CrawlingItem
							key={'Step_' + i}
							CrawlItem={new clsCrawlingItem(el)}
						/>
					);
				})}
			</div>
		);
	}
}

export default connect()(CrawlingStep);
