let qr = require('qr-encode');

let urlGenerator = require('./url-generator');

module.exports = {
	generate: text => {
		let dataURI = qr(urlGenerator.generator(text), { type: 6, size: 9, level: 'H' });

		return dataURI;
	}
};