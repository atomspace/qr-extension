var qr = require('qr-encode');
var $ = require("jquery");

$("#buttonQR").on('click',() => {
    $("#palace").hide();
    var text = $("#textQR").val();
    var dataURI = qr(location.href, {type: 6, size: 6, level: 'H'});
    var img = new Image();
    img.src = dataURI;
    document.body.appendChild(img);
});
