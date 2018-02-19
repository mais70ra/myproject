module.exports = {
    get: function(ext) {
        return extantions[ext] || 'text/html';
    }
};
var extantions = {
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.wav': 'audio/wav'
};
