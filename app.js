var Hapi = require('hapi'),
    path = require('path');

var serverOptions = {
    views: {
        engines: {
            html: require('swig')
        },
        path: path.join(__dirname, 'views')
    }
};

var server = new Hapi.Server('localhost', 3001, serverOptions),
    route = require('./routes/route'),
    routes = route.routes();

// Registering routes
for (var i = 0; i < routes.length; i++) {
    server.route(routes[i]);
}


var options = {
    subscribers: {
        'console': ['ops', 'request', 'log', 'error']
    }
};

server.pack.register({
    plugin: require('good'),
    options: options
}, function(err) {
    if (err) {
        console.log(err);
        return;
    }
});

server.start(function() {
    require('./lib/chat')(server.listener);
    console.log('Server started at: ' + server.info.uri);
});
