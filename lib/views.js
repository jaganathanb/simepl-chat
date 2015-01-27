var views = require('co-views');

exports.coViews = function(argument) {
    return views(__dirname + '/../views', {
        map: {
            html: 'swig'
        }
    });
};
