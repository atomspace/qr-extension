var qr = require('qr-encode');
var $ = require("jquery");
var manipulator = require('img-mainipulator.js');

$("#buttonQR").on('click',() => {
    manipulator.append();
    manipulator.remove();
});