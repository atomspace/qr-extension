let qr = require('qr-encode');
let $ = require('jquery');

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