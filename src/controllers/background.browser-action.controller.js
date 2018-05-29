let messageChannel = require('../services/message-channel');

let extension = window.chrome || (typeof browser === 'object') && browser;

// let action = extension.browserAction;

// if (extension.pageAction) {
// 	action = extension.pageAction;
// }

extension.pageAction.onClicked.addListener(() => {
	messageChannel.sendMessage('address', { success: true });
});