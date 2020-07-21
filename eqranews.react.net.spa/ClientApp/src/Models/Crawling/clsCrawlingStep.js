import clsCrawlingItem from './clsCrawlingItem';

export class clsCrawlingStep {
	constructor(data) {
		this.Type = data.Type;
		this.URL = data.URL;
		this.Selector = data.Selector;
		this.CrawlItems = [];
		if (data.CrawlItems.length) {
			data.CrawlItems.map((el, i) => {
				this.CrawlItems.push(new clsCrawlingItem(el));
				return el;
			});
		}
	}
}

export default clsCrawlingStep;
