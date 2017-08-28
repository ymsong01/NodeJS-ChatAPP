var express = require("express"),
    app     = express(),
    router  = express.Router(),
    Message = require("../model/MessageModel");

    router.post("/", function(req, res){
        console.log(req.body);
        res.status(200); 
    });

module.exports = router;
