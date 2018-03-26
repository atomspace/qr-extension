var qr = require('qr-image');
var fs = require('fs');

qr.image("Funny Valentine", { type: 'png',size:14 }).pipe(fs.createWriteStream('myQrCode.png'));