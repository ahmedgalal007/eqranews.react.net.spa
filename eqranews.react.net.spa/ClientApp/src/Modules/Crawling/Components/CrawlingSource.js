import React from 'react';
import { connect } from 'react-redux';
import CrawlingStep from './CrawlingStep';
import clsCrawling from '../../../Models/Crawling/clsCrawling';

class CrawlingSource extends React.Component {
	constructor(props) {
		super(props);
		this.Source = props.Source;
		console.log('Source:', this.Source);
		this.state = { Source: this.Source };
	}
	OnEditClick(e) {
		e.preventDefault();
		const elm = e.target;
		console.log(elm);
	}
	render() {
		return (
			<div className="crawling-source">
				<h1>{this.Source.Name}</h1>
				<button className="btn primary" onClick={this.OnEditClick}>
					Edit
				</button>
				{this.Source.Name}
				<br />
				{this.Source.Domain}
				<br />

				{this.Source.Stepper.map((el, i) => {
					return (
						<CrawlingStep
							key={'Step' + i}
							CrawlStep={new clsCrawling.clsCrawlingStep(el)}
						></CrawlingStep>
					);
				})}
			</div>
		);
	}
}

export default connect()(CrawlingSource);
