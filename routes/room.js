var express = require("express"),
    app     = express(),
    router  = express.Router(),
    Room    = require("../model/RoomModel");

    router.get("/", function(req, res){
        console.log("rooms/get req.user");
        Room.find().then(function(rooms){
            res.render("lobby", {
                rooms: rooms,
                user: req.user
            });
        });
    });

    router.get("/:id", function(req, res){
        console.log("getting room number: " + req.params.id);
        Room.findById(req.params.id).then(function(room){
            console.log("query: " + JSON.stringify(req.query));
            console.log("A room found: " + JSON.stringify(room));
            if(room){
                res.render("room", {
                    room: room,
                    user: req.user,
                    mode: req.query.mode
                });
            } else {
                res.sendStatus(404);
            }
        });

    });

module.exports = router;
