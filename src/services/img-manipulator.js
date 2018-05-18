let qrGenerator = require('./qr-generator');

const DELAY = 15000;

module.exports = {
	img: new Image(),

	append (text) {

		this.img.src = qrGenerator.generate(text);
		document.body.appendChild(this.img);
	},
	remove (time) {
		setTimeout(() => {
			document.body.removeChild(this.img);
		}, time || DELAY);
	}
};