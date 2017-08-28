var mongoose        = require("mongoose"),
    Schema          = mongoose.Schema,
    autoIncrement   = require("mongoose-auto-increment"),
    _               = require("underscore");

var roomSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    creator: {type: Number, ref: "User"},
    members: [{type: Number, ref: "User"}],
    messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
    lastActivity: Date,
    createdAt: Date
});

roomSchema.pre("save", function(next){
    if(this.isNew) {
        this.createdAt= Date.now();
        console.log("You created a new room on " + this.createdAt);
    }
    
    next();
});

roomSchema.plugin(autoIncrement.plugin, "Room");

module.exports = mongoose.model("Room", roomSchema);
