var qr = require('qr-encode');
var $ = require("jquery");

browser.pageAction.onClicked.addListener(() => {
$("#buttonQR").on('click',() => {
//    $("#palace").hide();
    var img = new Image();
    img.src = dataURI;
    document.body.appendChild(img);
    setTimeout(() => {
        document.body.removeChild(img);
    },10000);
});
});
