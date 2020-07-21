import React, { Component } from 'react';
import RightSidebarMessageItem from './RightSidebarMessageItem';

export default class RightSidebarMessages extends Component {
	constructor(props) {
		super(props);
		this.elemRef = React.createRef();
		this.headerElem = document.createElement('li');
		this.headerElem.classList.add('tab', 'col', 's4', 'p-0');
		this.headerElem.innerHTML = `<a href="#${this.props.ID}" class="active"><span>${this.props.Label}</span></a>`;

		this.messeges = [
			{
				avatar: this.getAvatar(7),
				content: 'Thank you',
				sender: 'Elizabeth Elliott',
				time: '5.00 AM',
				online: true,
			},
			{
				avatar: this.getAvatar(1),
				content: 'Hello Boo',
				sender: 'Mary Adams',
				time: '4.14 AM',
				online: true,
			},
			{
				avatar: this.getAvatar(2),
				content: 'Hello Boo',
				sender: 'Caleb Richards',
				time: '4.14 AM',
				online: false,
			},
			{
				avatar: this.getAvatar(3),
				content: 'Keny !',
				sender: 'Caleb Richards',
				time: '9.00 PM',
				online: true,
			},
			{
				avatar: this.getAvatar(4),
				content: 'Ohh God',
				sender: 'June Lane',
				time: '4.14 AM',
				online: true,
			},
			{
				avatar: this.getAvatar(5),
				content: 'Love you',
				sender: 'Edward Fletcher',
				time: '5.15 PM',
				online: false,
			},
			{
				avatar: this.getAvatar(6),
				content: 'Can we',
				sender: 'Crystal Bates',
				time: '8.00 AM',
				online: true,
			},
			{
				avatar: this.getAvatar(7),
				content: 'Great!',
				sender: 'Nathan Watts',
				time: '9.53 PM',
				online: false,
			},
			{
				avatar: this.getAvatar(8),
				content: 'Do it',
				sender: 'Willard Wood',
				time: '4.20 AM',
				online: false,
			},
			{
				avatar: this.getAvatar(1),
				content: 'Got that',
				sender: 'Ronnie Ellis',
				time: '5.20 AM',
				online: true,
			},
			{
				avatar: this.getAvatar(9),
				content: 'Thank you',
				sender: 'Daniel Russell',
				time: '12.00 AM',
				online: true,
			},
			{
				avatar: this.getAvatar(10),
				content: 'Okay you',
				sender: 'Sarah Graves',
				time: '11.14 PM',
				online: false,
			},
			{
				avatar: this.getAvatar(11),
				content: 'Can do',
				sender: 'Andrew Hoffman',
				time: '7.30 PM',
				online: false,
			},
			{
				avatar: this.getAvatar(12),
				content: 'Leave it',
				sender: 'Camila Lynch',
				time: '2.00 PM',
				online: true,
			},
		];
	}
	getAvatar = idx => `../../../app-assets/images/avatar/avatar-${idx}.png`;
	componentDidMount = () => {
		this.elemRef.current.parentNode.parentNode
			.querySelector('ul.tabs')
			.append(this.headerElem);
		console.log(
			'Tab Element',
			this.elemRef.current.parentNode.parentNode.querySelector('ul.tabs')
		);
	};

	render() {
		return (
			<div ref={this.elemRef} id={this.props.ID} className="col s12 pb-0">
				<div className="collection border-none mb-0">
					<input
						className="header-search-input mt-4 mb-2"
						type="text"
						name="Search"
						placeholder="Search Messages"
					/>
					<ul className="collection right-sidebar-chat p-0 mb-0">
						{this.messeges.map((m, i) => {
							return (
								<RightSidebarMessageItem key={`Message_${i}`} message={m} />
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}
