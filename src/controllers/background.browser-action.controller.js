let messageChannel = require('../services/message-channel');
let tabs = require('../services/tabs');

let extension = window.chrome || (typeof browser === 'object') && browser;
let { pageAction } = extension;

function isQRTab (tab) {
	if (!tab.url) return false;
	return !/^(chrome|data|about)\b/i.test(tab.url);
}

tabs.getAll().then(function (allTabs) {
	allTabs
		.filter(isQRTab)
		.map(tab => tab.id)
		.forEach(id => pageAction.show(id));

	return allTabs;
}).catch(function (err) {
	console.error(err);
});

tabs.onUpdated(function (tab) {
	if (isQRTab(tab)) {
		pageAction.show(tab.id);
	}
	else {
		pageAction.hide(tab.id);
	}
});

pageAction.onClicked.addListener(() => {
	messageChannel.sendMessage('address', { success: true });
});