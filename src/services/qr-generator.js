var qr = require('qr-encode');
var urlGenerator = require('url-generator');

module.exports = { 
    generate:() => {
        var dataURI = qr(qrGenerator.generate(), {type: 6, size: 6, level: 'H'});
        return dataURI;
    }
}