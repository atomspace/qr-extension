let tabs = require('./tabs');

let port = window.chrome && window.chrome.runtime || (typeof browser === 'object') && browser.runtime;
let detected = port && port.onMessage;

/**
 * Communication between popup page, content and background scripts. Also may be used as a regular event bus between different parts only in popup page or background scripts.
 */
module.exports = {

	/**
	 * Sends object to the defined channel
	 * @param {string} type - channel name
	 * @param {Object} message - message details
	 */
	sendMessage (type, message) {
		let data = {
			type,
			message
		};

		if (!detected) return;
		port.sendMessage(data, function () {
			let err = port.lastError; // eslint-disable-line no-unused-vars
		});
		tabs.getCurrentId().then(function (tabId) {
			if (tabId) tabs.sendMessage(tabId, data);
			return tabId;
		}).catch(function (err) {
			console.error(err);
		});
	},

	/**
	 * Handles new messages in a chosen channel
	 * @param {string} type - channel name
	 * @param {Function} callback - callback to be executed when new messages are recieved
	 */
	onMessage (type, callback) {
		if (!detected) {
			return;
		}
		port.onMessage.addListener(function (event) {
			if (event.type === type) {
				callback(event.message);
			}
		});
	}
};