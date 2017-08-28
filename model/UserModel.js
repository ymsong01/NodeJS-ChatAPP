var mongoose        = require("mongoose"),
    Schema          = mongoose.Schema,
    autoIncrement   = require("mongoose-auto-increment");

var userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: hashPassword
    },
    alias: String,
    joinedRooms: [{
        type: Number,
        ref: "Room"
    }],
    createdAt: Date
});

userSchema.methods.validatePassword = function(encryptedPassword){
    console.log("userSchema validate password");
    return encryptedPassword === this.password; 
};

function hashPassword(password){
    console.log("userSchema.hashPassword");
    return password;
    // TODO: DUMMY
};

userSchema.pre("save", function(next){
    if(this.isNew) {
        this.createdAt= Date.now();
        console.log("A new user is created on " + this.createdAt);
    }
    next();
});

userSchema.plugin(autoIncrement.plugin, "User");

module.exports = mongoose.model("User", userSchema);
