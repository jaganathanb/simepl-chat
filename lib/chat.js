module.exports = function(listener) {
    var io = require("socket.io").listen(listener);
    var people = {};
    io.on("connection", handler);

    function handler(client) {

        client.removeAllListeners();

        client.on("join", function(name) {
            console.log(name);
            people[client.id] = name;
            client.emit("update", "You have connected to the server.");
            client.broadcast.emit("update", "<strong class=\"text-info\">" + name + " has joined the server.</strong>");
            io.sockets.emit("update-people", people);
        });

        client.on('create-namespace', function (namespace) {
            console.log('request to create namespace ' +namespace);
            var v = io.of('/'+namespace);
                v.on('connection', handler);
                console.log('created ns');
                client.emit('namespace-created', true);
        });

        client.on('create-room', function(roomName) {
            client.join(roomName);
            client.emit('room-created', true);
            client.broadcast.emit('room-created', true);
        });

        client.on("send", function(msg) {
            client.broadcast.to(msg.roomName).emit('chat',people[client.id], msg.msg);
            client.emit("chat", people[client.id], msg.msg);
        });
        client.on("disconnect", function() {
            if (people[client.id]) {
                client.broadcast.emit("update", "<strong class=\"text-danger\">" +people[client.id] + " has left the server.</strong>");
                delete people[client.id];
                io.sockets.emit("update-people", people);
            }
        });
    }

};