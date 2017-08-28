var path        = require("path"),
    Room        = require(path.join(__dirname, "model/RoomModel")),
    User        = require(path.join(__dirname, "model/UserModel")),
    Message     = require(path.join(__dirname, "model/MessageModel")),
    mongoose    = require("mongoose"),
    Schema      = mongoose.Schema,
    bluebird    = require("bluebird");

    module.exports = function(){
        var testRoom = new Room ({
            name: "General Room",
            description: "This is a room for testing."
        });

        var studyRoom = new Room ({
            name: "Acedemic Discussion",
            description: "For some serious academic debates."
        })

        // var testUser = new User ({
        //     username: "myUsername",
        //     alias: "Test User"
        // });

        var testMessage = new Message ({
            content: "Testing message!"
        });

        var clearRoom = Room.remove();
        var clearUser = User.remove();
        var clearMessage = Message.remove();

        var createTestRoom = Room.create(testRoom);
        var createStudyRoom = Room.create(studyRoom);
        
        var createTestMessage = Message.create(testMessage);

        Promise.all([clearRoom, clearUser, clearMessage]).then(function(){
            Promise.all([createTestRoom, cretaeStudyRoom, createTestMessage]).then(function(){
                console.log("done setting up database");
            });
        });
    };
