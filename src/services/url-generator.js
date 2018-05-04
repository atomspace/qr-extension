module.exports = { 
    generator: (text) => {
        return text || location.href;
    }
}