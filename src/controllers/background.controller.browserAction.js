let messageChannel = require('../services/message-channel');

let extension = window.chrome || (typeof browser === 'object') && browser;

extension.browserAction.onClicked.addListener(() => {
	messageChannel.sendMessage('signal', { success: true });
});