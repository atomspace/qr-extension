// let qr = require('qr-encode');
let QR = require('qrcode');

let urlGenerator = require('./url-generator');

module.exports = {
	generate: text => {
		let urlForQr;

		QR.toDataURL(urlGenerator.generate(text), { errorCorrectionLevel: 'H', type: 'image/jpeg' }, function (err, url) {
			console.log(url);
			urlForQr = url;
			return urlForQr;
		});

		return urlForQr;

	}
};