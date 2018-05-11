let qrGenerator = require('./qr-generator');

const DELAY = 1000;

module.exports = {
	img: new Image(),

	append () {

		this.img.src = qrGenerator.generate();
		document.body.appendChild(this.img);
	},
	remove (time) {
		setTimeout(() => {
			document.body.removeChild(this.img);
		}, time || DELAY);
	}
};