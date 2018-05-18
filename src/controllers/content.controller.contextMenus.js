let messageChannel = require('../services/message-channel');
let manipulator = require('../services/img-manipulator');
let contextMessage = require('./background.controller.contextMenus');

messageChannel.onMessage('context', function (contextMessage) {
	manipulator.append(contextMessage);
	manipulator.remove();
});