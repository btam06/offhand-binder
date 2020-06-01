import Parameterizer from "./parameterizer.js";

export default class Binder {
	/**
	 * 
	 */
	constructor(el) {
		this.options = {
			debug: true,
			tabSelector: '.tab',
			anchorAttribute: 'data-binder-anchor',
			sourceAttribute: 'data-binder-source'
		};

		this.parameterizer = new Parameterizer();

		this.container = el;
		this.tabs      = this.container.querySelectorAll(this.options.tabSelector);
		this.anchors   = this.container.querySelectorAll('[' + this.options.anchorAttribute + ']');

		this.initialize();
	}

	/**
	 * 
	 */
	initialize() {
		let minHeight = 0;

		// Collect Info
		this.tabs.forEach((node, index) => {
			minHeight = Math.max(minHeight, node.clientHeight);
		});

		// Configure
		this.container.style.position = 'relative';

		this.tabs.forEach((node, index) => {
			const source        = node.getAttribute(this.options.sourceAttribute);
			const id            = node.id;
			const anchor        = this.container.querySelector('[' + this.options.anchorAttribute + '][href="#' + id + '"]');

			node.style.height   = minHeight;
			node.style.width    = this.container.offsetWidth;

			node.style.position = 'absolute';

			anchor.addEventListener('click', (event) => {
				event.preventDefault();
				this.parameterizer.load(event.target.href);
				this.activate(this.container.querySelector('#' + this.parameterizer.getHash()));
			});

			if (index == 0) {
				this.activate(node);
			}
		});
	}

	/**
	 * 
	 */
	activate(el) {
		this.tabs.forEach((node) => {
			node.style.display = 'none';
		});
		el.style.display = 'block';
	}
}