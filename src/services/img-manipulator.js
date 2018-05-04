var qrGenerator = require('qr-generator.js');

module.exports = { 
    append:() => {
        var img = new Image();
        img.src = qrGenerator.generate();
        document.body.appendChild(img);
    },
    remove:(time) => {
    
        document.body.removeChild(img);
    }
}