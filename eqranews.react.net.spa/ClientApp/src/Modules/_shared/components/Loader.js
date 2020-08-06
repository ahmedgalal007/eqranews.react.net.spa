import React, { Component } from 'react';

// import '../../../vendors/loading-bar/dist/loading-bar.js';

import '../../../vendors/loading-bar/dist/loading-bar.css';
let persentage = 0;
export default class Loader extends Component {
	componentDidMount = () => {
		// let ldBar = node => {};
		// require('../../../vendors/loading-bar/dist/loading-bar');
		// ldBar('.myldBar', { preset: stripe });
		//let timespan = Math.random()*2000 +2000
		if (window.ldBar) {
			const ldBar = window.ldBar;
			this.myldBar = this.drawRainboeWaveBar(ldBar);
			this.LaadingAnim = setInterval(() => {
				persentage += 1;
				if (persentage >= 100) persentage = 0;
				if (this.myldBar) this.myldBar.set(persentage);
				//this.forceUpdate();
			}, 100);
		}
	};

	componentWillUnmount = () => {
		clearInterval(this.loadingAnim);
	};
	render() {
		return (
			<div className="col s12 main-height">
				<div className="valign-wrapper main-height center-align">
					<div className="w-100">
						<div
							className="myldBar"
							style={{ width: '100%', height: '160px' }}
							data-transition-in="true"
						></div>
					</div>
				</div>
			</div>
		);
	}

	drawRainboeWaveBar = ldBar => {
		return ldBar('.myldBar', {
			stroke: 'data:ldbar/res,gradient(0,1,#9df,#9fd,#df9,#fd9)',
			path: 'M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20',
		});
	};

	drawBubbleBar = ldBar => {
		return ldBar('.myldBar', {
			preset: 'bubble',
			fill: 'data:ldbar/res,bubble(#6ad,#acf,50,3)',
		});
	};
	drawChromeBar = ldBar => {
		return ldBar('.myldBar', {
			type: 'fill',
			fill: 'data:ldbar/res,bubble(#6ad,#acf,50,3)',
			img: '/images/chrome.svg',
			fill: 'data:ldbar/res,bubble(#f00,#d00,100,1)',
			fillBackground: '#ddd',
			fillBackgroundExtrude: '2',
		});
	};

	drawAboutRainbowBar = ldBar => {
		const svgIMG = document.createElement('SVG');
		svgIMG.setAttribute('height', '0');
		svgIMG.innerHTML = `
				<mask id="mask">
					<path d="M40 150A80 80 0 1 1 140 150" stroke-width="15" stroke="#fff" stroke-dasharray="3 6"></path>
				</mask>
				<pattern id="p" width="200" height="200" patternUnits="userSpaceOnUse">
					<image href="/images/rainbow.png" width="200" height="200"></image>
				</pattern>`;

		const svgStyle = document.createElement('style');
		svgStyle.type = 'text/css';
		let cssChild = '.myldBar path {mask: url(#mask); }';
		if (svgStyle.styleSheet) {
			// This is required for IE8 and below.
			svgStyle.styleSheet.cssText = cssChild;
		} else {
			svgStyle.appendChild(document.createTextNode(cssChild));
		}

		const selectedBar = document.querySelector('.myldBar');
		selectedBar.parentElement.appendChild(svgIMG);
		selectedBar.parentElement.appendChild(svgStyle);

		selectedBar.classList.add('auto', 'label-center', 'mx-auto');
		selectedBar.style = 'height:160px;margin-top:-9px';
		// selectedBar.setAttribute('id', 'about-rainbow');
		// selectedBar.setAttribute('style', 'height:160px;margin-top:-9px');
		// selectedBar.setAttribute('data-type', 'stroke');
		// selectedBar.setAttribute('data-stroke-trail-width', '15');
		// selectedBar.setAttribute('data-stroke-width', '15');
		// selectedBar.setAttribute('data-stroke', 'url(#p)');
		// selectedBar.setAttribute('data-path', 'M40 150A80 80 0 1 1 140 150');

		return ldBar('.myldBar', {
			type: 'stroke',
			'stroke-trail-width': '15',
			'stroke-width': '15',
			strok: 'url(#p)',
			path: 'M40 150A80 80 0 1 1 140 150',
			// 	//img: '/images/rainbow.png',
		});
	};

	renderLoader = () => {
		return (
			<div>
				<div class="col-sm-4">
					<div
						class="ldBar auto no-percent label-center m-auto"
						style="height:150px"
						data-preset="bubble"
						data-fill="data:ldbar/res,bubble(#6ad,#acf,50,3)"
						data-value="50"
					></div>
				</div>
				<div class="col-sm-4">
					<div
						class="ldBar auto no-percent label-center m-auto"
						style="height:150px"
						data-value="50"
						data-type="fill"
						data-img="/assets/img/c/browser/chrome.svg"
						data-fill="data:ldbar/res,bubble(#f00,#d00,100,1)"
						data-fill-background="#ddd"
						data-fill-background-extrude="2"
					></div>
				</div>
				<div class="col-sm-4">
					<div
						class="ldBar auto label-center mx-auto"
						id="about-rainbow"
						style="height:160px;margin-top:-9px"
						data-type="stroke"
						data-stroke-trail-width="15"
						data-stroke-width="15"
						data-stroke="url(#p)"
						data-path="M40 150A80 80 0 1 1 140 150"
					></div>
					<svg height="0">
						<mask id="mask">
							<path
								d="M40 150A80 80 0 1 1 140 150"
								stroke-width="15"
								stroke="#fff"
								stroke-dasharray="3 6"
							></path>
						</mask>
						<pattern
							id="p"
							width="200"
							height="200"
							patternUnits="userSpaceOnUse"
						>
							<image
								href="/images/rainbow.png"
								width="200"
								height="200"
							></image>
						</pattern>
					</svg>
					<style type="text/css">{`#about-rainbow path {mask: url(#mask); }`}</style>
				</div>
			</div>
		);
	};
}
