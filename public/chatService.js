(function(window) {
   window.SocketService = function() {
        return {
            roomName: 'default',
            namespace: '/',
            connect: function(port, namespace, callback) {
                this.socket = io.connect("localhost:" + port + '/' + (namespace || ''));
                callback();
            },
            createRoom: function(roomName, callback) {
                var that = this;
                this.socket.emit('create-room', roomName);
                this.socket.on('room-created', function() {
                    callback(true);
                    console.log('room creted');
                });
            },
            createNamespace: function(namespace, callback) {
            	var that = this;
                this.socket.emit('create-namespace', namespace);
                this.socket.on('namespace-created', function() {
                    callback(true);
                    console.log('namespace creted');
                });
            },
            socket: null,
            join: function(name) {
                var that = this;
                this.socket.emit("join", name);
                console.log(name);
            },
            onUpdate: function(callback) {
                var that = this;
                this.socket.on('update', function(msg) {
                    callback(msg);
                    console.log(msg);
                });
            },
            onUpdatePeople: function(callback) {
                var that = this;
                this.socket.on('update-people', function(person) {
                    callback(person);
                    console.log(person);
                });
            },
            onChat: function(callback) {
                var that = this;
                this.socket.on('chat', function(who, msg) {
                    callback(who, msg);
                    console.log(msg);
                });
            },
            onDisconnect: function(callback) {
                this.socket.on('disconnect1', function() {
                    console.log('disconnected !');
                    callback();
                });
            },
            send: function(msg) {
                this.socket.emit('send', msg);
                console.log(msg);
            }
        };
    }
})(window);
