let qrGenerator = require('qr-generator.js');

module.exports = {
	append: () => {
		let img = new Image();

		img.src = qrGenerator.generate();
		document.body.appendChild(img);
	},
	remove: time => {
		setTimeout(() => {
			document.body.removeChild(img);
		}, time || 1000);
	}
};