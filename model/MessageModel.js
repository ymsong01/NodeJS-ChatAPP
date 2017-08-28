var mongoose        = require("mongoose"),
    Schema          = mongoose.Schema;

var messageSchema = new Schema({
    content: {type: String},
    createdAt: Date,
    author: {type: Number, ref: "User"}
});

messageSchema.pre("save", function(next){
    if(this.isNew) {
        this.createdAt= Date.now();
        console.log("A new message is created on " + this.createdAt);
    }
    next();
});

module.exports = mongoose.model("Message", messageSchema);
