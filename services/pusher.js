var qr = require('qr-encode');
var $ = require("jquery");
var generator = require('./generator.js');

$("#buttonQR").on('click',() => {
    var img = new Image();
    img.src = generator.generate();
    document.body.appendChild(img);
    setTimeout(() => {
        document.body.removeChild(img);
    },10000);
});