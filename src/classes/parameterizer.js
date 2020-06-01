export default class Parameterizer {
	/**
	 * 
	 */
	constructor () {
		this.initialize();
	}

	/**
	 * 
	 */
	initialize() {
		this.url         = null;
		this.hash        = null;
		this.queryString = null;
		this.params      = {};
	}

	/**
	 * 
	 */
	load(url) {
		this.initialize();
		
		this.url = url;

		const queryParts       = url.split('?');
		const hashParts        = url.split('#');

		if (queryParts.length > 1) {
			this.queryString = parts[1];

			this.queryString.split('?').foreach(pair => {
				keyVal = pair.split('&');
				this.params[keyVal[0]] = keyVal[1];
			});
		}

		if (hashParts.length > 1) {
			this.hash = hashParts[1];
		}

		return this;
	}

	/**
	 * 
	 */
	getHash() {
		return this.hash;
	}

	/**
	 * 
	 */
	getParam(param) {
		if (param in this.params) {
			return this.params[param];

		} else {
			return undefined;
		}
	}
}