var qr = require('qr-encode');
var locator = require('./locator')

module.exports = { 
    generate:() => {
        var dataURI = qr(locator.thisUrl(), {type: 6, size: 6, level: 'H'});
        return dataURI;
    }
}