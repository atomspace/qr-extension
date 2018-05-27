let $ = require('jquery');

let qrGenerator = require('./qr-generator');

let qrBackground;


module.exports = {
	img: new Image(),

	append (text) {
		qrBackground = $('<div>');

		qrBackground.style.position = 'fixed';
		$(qrBackground).css({
			position: 'fixed', width: '100%', height: '100%',
			top: '0', zIndex: '100', backgroundColor: 'rgba(0, 0, 0, 0.5)'
		});

		// qrBackground.style.width = '100%';
		// qrBackground.style.height = '100%';
		// qrBackground.style.top = '0';
		// qrBackground.style.zIndex = '100';
		// qrBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

		this.img.src = qrGenerator.generate(text);
		this.img.style.position = 'relative';
		this.img.style.left = '50%';
		this.img.style.top = '50%';
		this.img.style.marginLeft = '-185px';
		this.img.style.marginTop = '-185px';


		qrBackground.appendChild(this.img);

		// qrBackground.setAttribute('onclick', 'remove()');
		// document.body.appendChild(qrBackground);
		$('body').append(qrBackground);
	},
	remove () {
		$('body').on('click', function () {
			qrBackground.remove(qrBackground);
		});
	}
};