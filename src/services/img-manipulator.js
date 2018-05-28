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
			let bcWidth = $(window).width();
			let bcHeight = $(window).height();

			$(qrBackground).css({
				position: 'fixed', width: bcWidth, height: bcHeight,
				top: '0', zIndex: '100', backgroundColor: 'rgba(0, 0, 0, 0.5)'
			});
			this.img.src = qrGenerator.generate(text);


			$(this.img).css({
				position: 'relative', left: '50%', top: '50%', marginLeft: '-185px',
				marginTop: '-185px'
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