let $ = require('jquery');

let qrGenerator = require('./qr-generator');

let qrBackground;


module.exports = {
	img: new Image(),

	append (text) {
		qrBackground = $('<div>');


		$(qrBackground).css({
			position: 'fixed', width: '100%', height: '100%',
			top: '0', zIndex: '100', backgroundColor: 'rgba(0, 0, 0, 0.5)'
		});
		this.img.src = qrGenerator.generate(text);


		$(this.img).css({
			position: 'relative', left: '50%', top: '50%', marginLeft: '-185px',
			marginTop: '-185px'
		});

		$(qrBackground).append(this.img);

		$('body').append(qrBackground);
	},
	remove () {
		$('body').on('click', function () {
			$(qrBackground).remove();
		});
	}
};