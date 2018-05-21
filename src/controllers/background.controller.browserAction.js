let messageChannel = require('../services/message-channel');

let browserAction = window.browser && window.browser.browserAction;
let chromeAction = window.chrome && window.chrome.browserAction;
let browser;

if (chromeAction) {
	browser = chrome;
}

chrome.browserAction.onClicked.addListener(() => {
	messageChannel.sendMessage('signal', { success: true });
});