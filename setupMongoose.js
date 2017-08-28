var mongoose        = require("mongoose"),
    autoIncrement   = require("mongoose-auto-increment");

module.exports = function(){
    var connection = mongoose.connect('mongodb://localhost/chatRoomApp');
    autoIncrement.initialize(connection);
};
