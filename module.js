var qr = require('qr-image');
var fs = require('fs');
var text = require('/index.js')

qr.image(location.href, { type: 'png',size:14 }).pipe(fs.createWriteStream('myQrCode.png'));