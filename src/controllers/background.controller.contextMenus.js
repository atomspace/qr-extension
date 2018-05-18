let messageChannel = require('../services/message-channel');

chrome.contextMenus.create({
	id: 'qr-creator',
	title: 'Make QR',
	contexts: ['selection', 'link']
}, () => {
	console.log('Context Menus is realy awesome');
});

browser.contextMenus.onClicked.addListener(function (info) {
	var contextMessage = info.selectionText;

	switch (info.menuItemId) {
		case 'qr-creator':
			messageChannel.sendMessage('context', { success: true });
			console.log(info.selectionText);
			break;
	}
});

module.exports = contextMessage;