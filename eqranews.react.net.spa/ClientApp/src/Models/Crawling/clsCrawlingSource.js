export class clsCrawlingSource {
	constructor(data) {
		this.Name = data.Name;
		this.Domain = data.Domain;
		this.Stepper = data.Stepper || [];
	}
}

export default clsCrawlingSource;
