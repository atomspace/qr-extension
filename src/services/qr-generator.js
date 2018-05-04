let qr = require('qr-encode');

let urlGenerator = require('./url-generator');

module.exports = {
	generate: () => {
		let dataURI = qr(urlGenerator.generate(), { type: 6, size: 6, level: 'H' });

		return dataURI;
	}
};