let messageChannel = require('../services/message-channel');

let extension = window.chrome || (typeof browser === 'object') && browser;

extension.contextMenus.create({
	id: 'qr-link',
	title: 'Make QR from link',
	contexts: ['link']
});

extension.contextMenus.create({
	id: 'qr-text',
	title: 'Make QR from text',
	contexts: ['selection']
});

extension.contextMenus.create({
	id: 'qr-image',
	title: 'Make QR from image',
	contexts: ['image']
});

extension.contextMenus.onClicked.addListener(function (info) {
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