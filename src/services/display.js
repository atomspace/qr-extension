let qr = require('qr-encode');
let manipulator = require('src/services/img-mainipulator.js');

messageChannel.onMessage('show-qr', function () {
	manipulator.append();
	manipulator.remove();
});