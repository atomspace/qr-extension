let tabs = window.chrome && window.chrome.tabs || (typeof browser === 'object') && browser.tabs;
let runtime = window.chrome && window.chrome.runtime || (typeof browser === 'object') && browser.runtime;
let detected = Boolean(tabs);

module.exports = {
	sendMessage (tabId, data) {
		if (!detected) return;
		tabs.sendMessage(tabId, data, function () {
			let err = runtime.lastError; // eslint-disable-line no-unused-vars
		});
	},
	getCurrent () {
		if (!detected) return Promise.resolve();
		return new Promise(function (resolve, reject) {
			let promise = tabs.query({
				active: true,
				currentWindow: true
			}, resolve);

			if (promise && promise.then) {
				promise.then(resolve).catch(reject);
			}
		}).then(function (matches) {
			return matches[0];
		});
	},
	getCurrentId () {
		return module.exports.getCurrent().then(function (tab) {
			return tab && tab.id;
		});
	}
};