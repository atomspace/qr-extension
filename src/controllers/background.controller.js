let messageChannel = require('../services/message-channel');

chrome.pageAction.onClicked.addListener(() => {
	messageChannel.sendMessage('signal', { success: true });
	console.log("click!");
});

