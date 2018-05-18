let messageChannel = require('../services/message-channel');

chrome.browserAction.onClicked.addListener(() => {
	messageChannel.sendMessage('signal', { success: true });
});