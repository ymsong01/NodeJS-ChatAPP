var express             = require("express"),
    app                 = express(),
    http                = require("http"),
    path                = require("path"),
    PORT                = 5050,
    mongoose            = require("mongoose"),
    setupMongoose       = require(path.join(__dirname, "setupMongoose"));
    setupMongoose();

var Room                = require(path.join(__dirname, "model/RoomModel")),
    User                = require(path.join(__dirname, "model/UserModel")),
    Message             = require(path.join(__dirname, "model/MessageModel"));

var auth                = require(path.join(__dirname, "routes/auth")),
    room                = require(path.join(__dirname, "routes/room")),
    chat                = require(path.join(__dirname, "routes/chat"));

var bodyParser          = require("body-parser"),
    bluebird            = require("bluebird"),
    seedDB              = require(path.join(__dirname, "seedDB"));
    passport            = require("passport"),
    LocalStrategy       = require("passport-local").Strategy,
    session             = require("express-session"),
    configIO            = require(path.join(__dirname, "config/configio"));

    mongoose.Promise = bluebird;

    app.set("view engine", "jade");
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(session({
        secret: "tomahto",
        saveUninitialized: false,
        resave: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function attachPath(req, res, next){
      res.locals.path = req.path;
      next();
    });
    app.use("/auth", auth);
    app.use("/rooms", room);
    app.use("/rooms/:id/chats", chat);

    require(path.join(__dirname, "config/passport"))(passport);

    var server = http.createServer(app);
    var io = require(path.join(__dirname, "config/socketio"))(server);
    configIO(io);
    server.listen(PORT);

    seedDB();

    app.get("/", function(req, res){
        res.redirect("/rooms");
    });
