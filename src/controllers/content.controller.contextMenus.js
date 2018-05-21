let messageChannel = require('../services/message-channel');
let manipulator = require('../services/img-manipulator');

messageChannel.onMessage('context', function (details) {
	manipulator.append(details.contextMessage);
	manipulator.remove();
});