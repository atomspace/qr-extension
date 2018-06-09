let $ = require('jquery');

let qrGenerator = require('./qr-generator');

let qrBackground;
let isOn = false;

module.exports = {
	img: new Image(),

	append (text) {
		if (isOn === false) {
			isOn = true;
			qrBackground = $('<div>');

			$(qrBackground).css({
				position: 'fixed', width: '100%', height: '100%', left: '0',
				top: '0', zIndex: '10000', backgroundColor: 'rgba(0, 0, 0, 0.5)'
			});
			this.img.src = qrGenerator.generate(text);


			$(this.img).css({
				position: 'relative', left: '50%', top: '50%', marginLeft: '-250px',
				marginTop: '-250px', border: '5px solid white'
			});

			$(qrBackground).append(this.img);

			$('body').append(qrBackground);
		}
	},
	remove () {
		if (isOn === true) {
			$('body').on('click', function () {
				$(qrBackground).remove();
				isOn = false;
			});
		}
	}
};