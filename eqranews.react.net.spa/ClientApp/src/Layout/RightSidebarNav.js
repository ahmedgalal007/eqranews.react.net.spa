import React, { Component } from 'react';
import RightSidebarMessages from './LayoutComponents/RightSidebarMessages';
import RightSidebarSettings from './LayoutComponents/RightSidebarSettings';
import RightSidebarActivities from './LayoutComponents/RightSidebarActivities';

export default class RightSidebarNav extends Component {
	render() {
		return (
			<aside id="right-sidebar-nav">
				<div
					id="slide-out-right"
					className="slide-out-right-sidenav sidenav rightside-navigation"
				>
					<div className="row">
						<div className="slide-out-right-title">
							<div className="col s12 border-bottom-1 pb-0 pt-1">
								<div className="row">
									<div className="col s2 pr-0 center">
										<i className="material-icons vertical-text-middle">
											<a href="#" className="sidenav-close">
												clear
											</a>
										</i>
									</div>
									<div className="col s10 pl-0">
										<ul className="tabs"></ul>
									</div>
								</div>
							</div>
						</div>
						<div className="slide-out-right-body row pl-3">
							<RightSidebarMessages ID="messages" Label="Messages" />
							<RightSidebarSettings ID="settings" Label="Settings" />
							<RightSidebarActivities ID="activity" Label="Activity" />
						</div>
					</div>
				</div>

				{
					//<!-- Slide Out Chat -->
				}
				<ul
					id="slide-out-chat"
					className="sidenav slide-out-right-sidenav-chat"
				>
					<li className="center-align pt-2 pb-2 sidenav-close chat-head">
						<a href="#!">
							<i className="material-icons mr-0">chevron_left</i>Elizabeth
							Elliott
						</a>
					</li>
					<li className="chat-body">
						<ul className="collection">
							<li
								className="collection-item display-flex avatar pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<span className="avatar-status avatar-online avatar-50">
									<img
										src="../../../app-assets/images/avatar/avatar-7.png"
										alt="avatar"
									/>
								</span>
								<div className="user-content speech-bubble">
									<p className="medium-small">hello!</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar justify-content-end pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<div className="user-content speech-bubble-right">
									<p className="medium-small">
										How can we help? We're here for you!
									</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<span className="avatar-status avatar-online avatar-50">
									<img
										src="../../../app-assets/images/avatar/avatar-7.png"
										alt="avatar"
									/>
								</span>
								<div className="user-content speech-bubble">
									<p className="medium-small">
										I am looking for the best admin template.?
									</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar justify-content-end pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<div className="user-content speech-bubble-right">
									<p className="medium-small">
										Materialize admin is the responsive materializecss admin
										template.
									</p>
								</div>
							</li>

							<li className="collection-item display-grid width-100 center-align">
								<p>8:20 a.m.</p>
							</li>

							<li
								className="collection-item display-flex avatar pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<span className="avatar-status avatar-online avatar-50">
									<img
										src="../../../app-assets/images/avatar/avatar-7.png"
										alt="avatar"
									/>
								</span>
								<div className="user-content speech-bubble">
									<p className="medium-small">Ohh! very nice</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar justify-content-end pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<div className="user-content speech-bubble-right">
									<p className="medium-small">Thank you.</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<span className="avatar-status avatar-online avatar-50">
									<img
										src="../../../app-assets/images/avatar/avatar-7.png"
										alt="avatar"
									/>
								</span>
								<div className="user-content speech-bubble">
									<p className="medium-small">How can I purchase it?</p>
								</div>
							</li>

							<li className="collection-item display-grid width-100 center-align">
								<p>9:00 a.m.</p>
							</li>

							<li
								className="collection-item display-flex avatar justify-content-end pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<div className="user-content speech-bubble-right">
									<p className="medium-small">From ThemeForest.</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar justify-content-end pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<div className="user-content speech-bubble-right">
									<p className="medium-small">Only $24</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<span className="avatar-status avatar-online avatar-50">
									<img
										src="../../../app-assets/images/avatar/avatar-7.png"
										alt="avatar"
									/>
								</span>
								<div className="user-content speech-bubble">
									<p className="medium-small">Ohh! Thank you.</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<span className="avatar-status avatar-online avatar-50">
									<img
										src="../../../app-assets/images/avatar/avatar-7.png"
										alt="avatar"
									/>
								</span>
								<div className="user-content speech-bubble">
									<p className="medium-small">I will purchase it for sure.</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar justify-content-end pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<div className="user-content speech-bubble-right">
									<p className="medium-small">
										Great, Feel free to get in touch on
									</p>
								</div>
							</li>
							<li
								className="collection-item display-flex avatar justify-content-end pl-5 pb-0"
								data-target="slide-out-chat"
							>
								<div className="user-content speech-bubble-right">
									<p className="medium-small">https://pixinvent.ticksy.com/</p>
								</div>
							</li>
						</ul>
					</li>
					<li className="center-align chat-footer">
						<form
							className="col s12"
							onsubmit="slideOutChat()"
							action="javascript:void(0);"
						>
							<div className="input-field">
								<input id="icon_prefix" type="text" className="search" />
								<label htmlFor="icon_prefix">Type here..</label>
								<a onclick="slideOutChat()">
									<i className="material-icons prefix">send</i>
								</a>
							</div>
						</form>
					</li>
				</ul>
			</aside>
		);
	}
}
