var config = function(io){
  io.on("connection", function(socket){
      console.log("A new user entered the lobby");
      

      socket.on("message", function(data){
          console.log("Message received");
          console.log(data);
          io.emit("new message", data);
      });

      socket.on("enter room", function(){
          console.log("Entering the room.");
      });
      
      socket.on("disconnect", function(){
          console.log("Leaving the room now.");
      });
      
      socket.on("leave room", function(){
          console.log("Leaving the room now.");
      });
  });
};

module.exports = config;
