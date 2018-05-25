let messageChannel = require('../services/message-channel');
let manipulator = require('../services/img-manipulator');

messageChannel.onMessage('address', function () {
	manipulator.append();
	manipulator.remove();
});