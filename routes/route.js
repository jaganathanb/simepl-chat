module.exports = {
    routes: function(options) {
        return [{
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: 'public',
                    listing: false
                }
            }
        }, {
            method: 'GET',
            path: '/',
            handler: function(req, reply) {
                reply.view('index');
            }
        }];
    }
};
