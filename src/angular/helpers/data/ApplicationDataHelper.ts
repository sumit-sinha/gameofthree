/**
 * generic class to read data which is passed from server
 * @author ssinha
 */
export class ApplicationDataHelper {

	private data: Object;

	private static instance: ApplicationDataHelper;

	/**
	 * function to get an instance of this class
	 * @return {ApplicationDataHelper}
	 */
	static getInstance(): ApplicationDataHelper {
		ApplicationDataHelper.instance = ApplicationDataHelper.instance || new ApplicationDataHelper();
		return ApplicationDataHelper.instance;
	}

	constructor() {
		this.data = this.parseData();
	}

	/**
	 * function to get stored data
	 * @param key {String} id
	 * @return {Object}
	 */
	getData(key: String) {
		return this.data[key];
	}

	/**
	 * function to set data inside cached data object
	 * @param args {Object}
	 */
	setData(args: Object) {
		if (this.data == null) {
			this.data = {};
		}

		this.data[args.key] = args.data;
	}

	/**
	 * function to parse data from HTML
	 * @return {Object}
	 */
	private parseData() {

		let element = document.getElementsByTagName("game-of-three")[0];
		if (element) {
			return JSON.parse(element.getAttribute("init-data"));
		}

		return {};
	}
}