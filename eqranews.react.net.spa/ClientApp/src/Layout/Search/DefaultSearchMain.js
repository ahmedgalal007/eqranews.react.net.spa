import React, { Component } from 'react';

export default class DefaultSearchMain extends Component {
	render() {
		return (
			<ul className="display-none" id="default-search-main">
				<li className="auto-suggestion-title">
					<a className="collection-item" href="/">
						<h6 className="search-title">FILES</h6>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										src="../../../app-assets/images/icon/pdf-image.png"
										width="24"
										height="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">Two new item submitted</span>
									<small className="grey-text">Marketing Manager</small>
								</div>
							</div>
							<div className="status">
								<small className="grey-text">17kb</small>
							</div>
						</div>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										src="../../../app-assets/images/icon/doc-image.png"
										width="24"
										height="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">52 Doc file Generator</span>
									<small className="grey-text">FontEnd Developer</small>
								</div>
							</div>
							<div className="status">
								<small className="grey-text">550kb</small>
							</div>
						</div>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										src="../../../app-assets/images/icon/xls-image.png"
										width="24"
										height="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">25 Xls File Uploaded</span>
									<small className="grey-text">Digital Marketing Manager</small>
								</div>
							</div>
							<div className="status">
								<small className="grey-text">20kb</small>
							</div>
						</div>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										src="../../../app-assets/images/icon/jpg-image.png"
										width="24"
										height="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">Anna Strong</span>
									<small className="grey-text">Web Designer</small>
								</div>
							</div>
							<div className="status">
								<small className="grey-text">37kb</small>
							</div>
						</div>
					</a>
				</li>
				<li className="auto-suggestion-title">
					<a className="collection-item" href="/">
						<h6 className="search-title">MEMBERS</h6>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										className="circle"
										src="../../../app-assets/images/avatar/avatar-7.png"
										width="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">John Doe</span>
									<small className="grey-text">UI designer</small>
								</div>
							</div>
						</div>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										className="circle"
										src="../../../app-assets/images/avatar/avatar-8.png"
										width="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">Michal Clark</span>
									<small className="grey-text">FontEnd Developer</small>
								</div>
							</div>
						</div>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										className="circle"
										src="../../../app-assets/images/avatar/avatar-10.png"
										width="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">Milena Gibson</span>
									<small className="grey-text">Digital Marketing</small>
								</div>
							</div>
						</div>
					</a>
				</li>
				<li className="auto-suggestion">
					<a className="collection-item" href="/">
						<div className="display-flex">
							<div className="display-flex align-item-center flex-grow-1">
								<div className="avatar">
									<img
										className="circle"
										src="../../../app-assets/images/avatar/avatar-12.png"
										width="30"
										alt="sample"
									/>
								</div>
								<div className="member-info display-flex flex-column">
									<span className="black-text">Anna Strong</span>
									<small className="grey-text">Web Designer</small>
								</div>
							</div>
						</div>
					</a>
				</li>
			</ul>
		);
	}
}
