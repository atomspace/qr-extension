let qr = require('qr-encode');
let $ = require('jquery');


$('#buttonQR').on('click', () => {
	$('#palace').hide();
	let text = $('#textQR').val();
	let dataURI = qr(location.href, { type: 6, size: 6, level: 'H' });
	let img = new Image();

	img.src = dataURI;
	document.body.appendChild(img);
	setTimeout(() => {
		document.body.removeChild(img);
	}, 10000);
});