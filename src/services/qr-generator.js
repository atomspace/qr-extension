// let qr = require('qr-encode');
let QR = require('qrcode');

let urlGenerator = require('./url-generator');

module.exports = {
	generate: text => {
		// let dataURI = qr(urlGenerator.generate(text), { type: 8, size: 9, level: 'H' });
		let dataURI = QR.toDataURL(urlGenerator.generate(text), { errorCorrectionLevel: 'H', type: 'image/jpeg' }, function (err, url) {
			console.log(url);
			return url;
		});

		return dataURI;
	}
};