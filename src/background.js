let messageChannel = require('./services/message-channel');

setInterval(function () {
	messageChannel.sendMessage('signal', { success: true });
}, 2000);

console.log('Oraoraoraora');

// browser.pageAction.onClicked.addListener(() => {
    
// });
