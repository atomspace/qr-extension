let QR = require('qrcode');

let urlGenerator = require('./url-generator');

module.exports = {
	generate: text => {
		let urlForQr;

		QR.toDataURL(urlGenerator.generate(text), { errorCorrectionLevel: 'H', type: 'image/png', width: 500 }, function (err, url) {
			urlForQr = url;
			return urlForQr;
		});

		return urlForQr;

	}
};