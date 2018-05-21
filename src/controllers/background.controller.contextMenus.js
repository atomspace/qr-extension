let messageChannel = require('../services/message-channel');

let browserAction = window.browser && window.browser.browserAction;
let chromeAction = window.chrome && window.chrome.browserAction;
let browser;

if (chromeAction) {
	browser = chrome;
}

browser.contextMenus.create({
	id: 'qr-link',
	title: 'Make QR from link',
	contexts: ['link']
});

browser.contextMenus.create({
	id: 'qr-text',
	title: 'Make QR from text',
	contexts: ['selection']
});

browser.contextMenus.create({
	id: 'qr-image',
	title: 'Make QR from image',
	contexts: ['image']
});

browser.contextMenus.onClicked.addListener(function (info) {
	switch (info.menuItemId) {
		case 'qr-text':
			messageChannel.sendMessage('context', { contextMessage: info.selectionText });
			break;
		case 'qr-link':
			messageChannel.sendMessage('context', { contextMessage: info.selectionText });

			break;
		case 'qr-iamge':
			messageChannel.sendMessage('context', { contextMessage: info.selectionText });
			break;
	}
});