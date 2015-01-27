$(document).ready(function() {
    var baseSocketService = new SocketService();
    baseSocketService.connect(3001, '', function(argument) {
        baseSocketService.createNamespace('public', function() {
            var socketService = new SocketService();
            socketService.connect(3001, 'public', function() {
                $(".row.people").hide();
                $(".form-control.name").focus();
                $("form").submit(function(event) {
                    event.preventDefault();
                });

                $(".btn.join").click(function() {
                    var name = $(".form-control.name").val();
                    if (name != "") {
                        // socket.emit("join", name);
                        socketService.join(name);
                        $(".row.join").hide();
                        $(".row.people").show();
                    }
                });
                $(".form-control.name").keypress(function(e) {
                    if (e.which == 13) {
                        var name = $(".form-control.name").val();
                        if (name != "") {
                            //  socket.emit("join", name);
                            $(".row.join").hide();
                            $(".row.people").show();
                        }
                    }
                });

                socketService.onUpdate(function(msg) {
                    $(".chat-messages").append("<li>" + msg + "</li>");
                });

                socketService.onUpdatePeople(function(person) {
                    $('ul.people-list').append("<li>" + person.name + "</li>");
                })

                socketService.onChat(function(who, msg) {
                    $(".chat-messages").append("<li><strong><span class='text-success'>" + who + "</span></strong> says: " + msg + "</li>");
                });

                socketService.onDisconnect(function() {
                    $(".chat-messages").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
                    $(".chat-text").attr("disabled", "disabled");
                    $(".btn.send").attr("disabled", "disabled");
                });

                $(".btn.send").click(function() {
                    var msg = $(".chat-text").val();
                    msg = {
                        msg: msg,
                        roomName: socketService.roomName
                    };
                    socketService.send(msg);
                    $(".chat-text").val("");
                });

                $('.create-cntr').hide();
                $('.create-btn').click(function() {
                    socketService.createRoom($('.room-name').val(), function() {
                        $('.create-cntr').hide();
                        socketService.roomName = $('.room-name').val()
                    });
                });

                $('.create-lbl').click(function() {
                    $(this).hide();
                    $('.create-cntr').show();
                });

                $(".chat-text").keypress(function(e) {
                    if (e.which == 13) {
                        var msg = $(".chat-text").val();
                        // socket.emit("send", msg);
                        $(".chat-text").val("");
                    }
                });

            });
        });
    });
});
