$(document).ready(function(){
    var socket;

    function bindUIEvent(){
        $("#post").click("click", function(){

            if(user && user.username){
                var text = $("#text").val().text;
                socket.emit("message", {
                    text: text,
                    username: user.username,
                    timestamp: new Date() 
                });
            }
        });
    }

    function connectSocket(){
        socket = io();
        socket.on("new message", function(data){
            console.log("A new message is posted on ");
            console.log(data);
        });
    }

    connectSocket();
    bindUIEvent();

});
