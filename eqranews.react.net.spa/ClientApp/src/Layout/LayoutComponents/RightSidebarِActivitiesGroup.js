import React, { Component } from 'react';

const renderActivity = Payload => {
	switch (Payload.type) {
		case 'content':
			return (
				<div className="timeline-content">
					<img
						src={Payload.image.src}
						alt={Payload.image.alt}
						height={Payload.image.height}
						width={Payload.image.width}
						className={Payload.image.className}
					/>
					{Payload.desc}
				</div>
			);
		//break;
		default:
			return (
				<div className={`timeline-content ${Payload.color}-text`}>
					{Payload.text}
				</div>
			);
	}
};

export default class RightSidebarِActivitiesGroup extends Component {
	render() {
		return (
			<React.Fragment>
				<p className="mt-5 mb-0 ml-5 font-weight-900">{this.props.Label}</p>
				<ul className="widget-timeline mb-0">
					{this.props.ActivityItems.map((item, i) => {
						return (
							<li
								key={item.title}
								className={`timeline-items timeline-icon-${item.iconColor} ${
									item.active ? 'active' : ''
								}`}
							>
								<div className="timeline-time">{item.time}</div>
								<h6 className="timeline-title">{item.title}</h6>
								<p className="timeline-text">{item.text}</p>
								{renderActivity(item.payload)}
							</li>
						);
					})}
				</ul>
			</React.Fragment>
		);
	}
}
