browser.pageAction.onClicked.addListener(() => {
	messageChannel.send('show-qr');
});