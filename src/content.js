let qr = require('qr-encode');
let $ = require('jquery');

let messageChannel = require('./services/message-channel');

browser.pageAction.onClicked.addListener(() => {
	$('#buttonQR').on('click', () => {

		//    $("#palace").hide();
		let img = new Image();

		img.src = dataURI;
		document.body.appendChild(img);
		setTimeout(() => {
			document.body.removeChild(img);
		}, 10000);
	});
});

messageChannel.onMessage('signal', function (data) {
	console.log(data);
});