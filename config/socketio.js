var socketIO = require("socket.io"),
    http = require("http");

    module.exports = function setupSocketIO(server){
        return require("socket.io").listen(server);
    };
